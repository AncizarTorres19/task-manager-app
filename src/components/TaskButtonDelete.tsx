import axiosClient from "@/app/config/AxiosClient";
//ui
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export const TaskButtonDelete = ({ taskId, getUserTasks }: { taskId: number, getUserTasks: () => void }) => {

    const handleDelete = async () => {
        try {
            await axiosClient.delete(`tasks/${taskId}`);
            toast({
                title: "Tarea eliminada",
                description: "La tarea ha sido eliminada exitosamente",
                duration: 5000,
            });
            getUserTasks();
        } catch (error) {
            toast({
                title: "Error al eliminar la tarea",
                description: "Ocurrió un error al intentar eliminar la tarea",
                variant: "destructive",
                duration: 5000,
            });
        }
    }
    return (
        <Button variant="destructive" onClick={() => handleDelete()}>
            Eliminar
        </Button>
    )
}