import { Button } from "./ui/button";
// import { removeTask } from "@/actions/tasks-actions";

export const TaskButtonDelete = () => {
    return (
        <form /* action={removeTask} */>
            <input type="hidden" name="taskId" /* value={taskId} */ />
            <Button variant="destructive">Delete</Button>
        </form>
    )
}
