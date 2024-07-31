'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//Components
import { Spinner } from "@/components/Spinner";
import ClientTaskPageEdit from "./ClientTaskPageEdit";
//Axios
import axiosClient from "@/app/config/AxiosClient";

const TaskPageEdit = ({ params }: { params: { id: string } }) => {

    const router = useRouter();

    const [task, setTask] = useState(null);
    const [hydrated, setHydrated] = useState<boolean>(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosClient.get(`tasks/by-id/${params.id}`);
                const task = response.data.task;
                if (!task) {
                    router.push('/tasks');
                } else {
                    setTask(task);
                }
            } catch (error) {
                console.error('Error fetching task:', error);
                router.push('/tasks');
            } finally {
                setHydrated(true);
            }
        };

        fetchTask();
    }, [params.id]);

    if (!hydrated) {
        return <Spinner />;
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <ClientTaskPageEdit task={task} />
        </div>
    );
};

export default TaskPageEdit;
