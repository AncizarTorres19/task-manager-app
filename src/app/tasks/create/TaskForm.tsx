'use client';

import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// Components
import { Button, buttonVariants } from "@/components/ui/button";
// ui
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Interfaces
import { Task } from "@/components/interfaces";
// Axios
import axiosClient from "../../config/AxiosClient";
// Hooks
import useUserSession from "@/hooks/useUserSession";

export function TaskForm({ task }: { readonly task?: Task | null }) {

  const { userInSession } = useUserSession();

  const router = useRouter();

  const { toast } = useToast();

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<Task>({
    defaultValues: {
      id: task?.id,
      name: task?.name ?? '',
      description: task?.description ?? '',
      priority: task?.priority ?? '',
    }
  });

  const onSubmit: SubmitHandler<Task> = (data) => {
    if (task?.id) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  }

  const handleCreate = async (data: Task) => {
    const newTask = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      userId: userInSession?.id
    }
    try {
      await axiosClient.post('tasks', newTask);
      toast({
        title: "¡Tarea creada!",
        description: "La tarea ha sido creada exitosamente",
      });
      reset();
      router.push('/tasks');
    } catch (error) {
      toast({
        title: "Uh oh! Error al crear la tarea",
        description: (error as any).response?.data?.msg || "Ocurrió un error al intentar crear la tarea",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  const handleUpdate = async (data: Task) => {
    try {
      await axiosClient.put(`tasks/${data.id}`, data);
      toast({
        title: "¡Tarea actualizada!",
        description: "La tarea ha sido actualizada exitosamente",
      });
      reset();
      router.push('/tasks');
    } catch (error) {
      toast({
        title: "Uh oh! Error al actualizar la tarea",
        description: (error as any).response.data.msg || "Ocurrió un error al intentar actualizar la tarea",
        variant: "destructive",
      });
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{task?.id ? "Actualizar tarea" : "Crear tarea"}</CardTitle>
          <CardDescription>
            {task?.id ? "Actualice la información de la tarea a continuación." : "Complete el formulario a continuación para crear una nueva tarea."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                {...register("name", { required: true })}
                name="name"
                id="name"
                placeholder="Nombre de la tarea"
              />
              {errors.name && <span className="text-red-500 text-sm">El nombre es requerido</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                {...register("description", { required: true })}
                name="description"
                id="description"
                placeholder="Descripción de la tarea"
              />
              {errors.description && <span className="text-red-500 text-sm">La descripción es requerida</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="priority">Prioridad</Label>
              <Controller
                name="priority"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && <span className="text-red-500 text-sm">La prioridad es requerida</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/tasks" className={buttonVariants({ variant: "secondary" })}>
            Cancelar
          </Link>
          <Button type="submit">
            {task?.id ? "Actualizar" : "Crear"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
