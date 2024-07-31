'use client';

import { useEffect, useState } from "react";
import { TaskForm } from "./TaskForm"
import { Spinner } from "@/components/Spinner";

const NewTaks = () => {

    const [hydrated, setHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHydrated(true);
    }, []);


    if (!hydrated) {
        return <Spinner />;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <TaskForm />
        </div>
    )
}

export default NewTaks
