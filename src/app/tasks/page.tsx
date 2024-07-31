'use client';
import { useEffect, useState } from "react";
//Components
import { Spinner } from "@/components/Spinner";
import { Task } from "@/components/interfaces";
import { TaskCard } from "@/components/TaskCard";
//Hooks
import useUserSession from "@/hooks/useUserSession";
//Axios
import axiosClient from "../config/AxiosClient";

const Tasks = () => {

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {tasks.map((task) => (
                <TaskCard task={task} key={task.id} getUserTasks={getUserTasks} />
            ))}
            {(tasks.length === 0 && userInSession) && <span>No hay tareas</span>}
        </div>
    )
}

export default Tasks