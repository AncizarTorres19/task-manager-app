import clsx from "clsx";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { TaskButtonDelete } from "./TaskButtonDelete";
import { Task } from "./interfaces";

const names: { [key: string]: string } = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente',
}

export const TaskCard = ({ task, getUserTasks }: { task: Task, getUserTasks: () => void }) => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>{task?.name}</CardTitle>
                <Badge
                    className={clsx({
                        "bg-red-500 text-white": task?.priority === "high",
                        "bg-yellow-500": task?.priority === "medium",
                        "bg-green-500": task?.priority === "low",
                        "bg-blue-500": task?.priority === "urgent",
                    })}
                >
                    {names[task?.priority]}
                </Badge>
            </CardHeader>
            <CardContent>
                <p>{task?.description}</p>
                <span className="text-slate-600">
                    {new Date(task?.createdAt ?? "").toLocaleDateString()}
                </span>
            </CardContent>
            <CardFooter className="flex gap-x-2 justify-end">
                <TaskButtonDelete taskId={task?.id} getUserTasks={getUserTasks} />
                <Link
                    href={`/tasks/${task?.id}/edit`}
                    className={buttonVariants({ variant: "secondary" })}
                >
                    Editar
                </Link>
            </CardFooter>
        </Card>
    )
}
