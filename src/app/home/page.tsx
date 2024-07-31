'use client';

import useUserSession from "@/hooks/useUserSession";
import { useEffect, useState } from "react";
import axiosClient from "../config/AxiosClient";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/components/interfaces";
import { Spinner } from "@/components/Spinner";

const Home = () => {

    const { userInSession } = useUserSession();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [hydrated, setHydrated] = useState<boolean>(false);

    const getUserTasks = async () => {
        if (!userInSession) return;
        try {
            const { data } = await axiosClient.get(`tasks/${userInSession.id}`)
            setTasks(data.tasks);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserTasks();
    }, [userInSession]);

    useEffect(() => {
        setHydrated(true);
    }, []);


    if (!hydrated) {
        return <Spinner />;
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {tasks.map((task) => (
                <TaskCard task={task} key={task.id} getUserTasks={getUserTasks} />
            ))}
            {(tasks.length === 0 && userInSession) && <span>No hay tareas</span>}
        </div>
    )
}

export default Home
