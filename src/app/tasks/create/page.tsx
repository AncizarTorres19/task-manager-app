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
        <div className="flex justify-center items-start min-h-screen p-4">
            <TaskForm />
        </div>
    )
}

export default NewTaks
