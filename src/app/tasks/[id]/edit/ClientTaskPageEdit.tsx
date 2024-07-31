'use client';

//Components
import { Task } from "@/components/interfaces";
import { TaskForm } from "@/app/tasks/create/TaskForm";

const ClientTaskPageEdit = ({ task }: { task: Task | null }) => {
    return (
        <div className="flex justify-center items-start h-screen">
            <TaskForm task={task} />
        </div>
    );
};

export default ClientTaskPageEdit;
