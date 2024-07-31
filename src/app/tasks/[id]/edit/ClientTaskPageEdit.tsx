'use client';

import { TaskForm } from "@/app/tasks/create/TaskForm";
import { Task } from "@/components/interfaces";

const ClientTaskPageEdit = ({ task }: { task: Task | null }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <TaskForm task={task} />
        </div>
    );
};

export default ClientTaskPageEdit;
