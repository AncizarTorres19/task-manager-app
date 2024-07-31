'use client';

import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/components/interfaces";
import { useToast } from "@/components/ui/use-toast";
import axiosClient from "../config/AxiosClient";
import useUserSession from "@/hooks/useUserSession";

export function TaskForm({ task }: { readonly task?: Task | null}) {

  const { userInSession } = useUserSession();

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
      window.location.href = '/home';
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
      window.location.href = '/home';
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Crear tarea</CardTitle>
          <CardDescription>
            Complete el formulario a continuación para crear una nueva tarea.
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
              {errors.name && <span>Name is required</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                {...register("description", { required: true })}
                name="description"
                id="description"
                placeholder="Descripción de la tarea"
              />
              {errors.description && <span>Description is required</span>}
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
              {errors.priority && <span>Priority is required</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Cancel
          </Link>
          <Button type="submit">
            {task?.id ? "Actualizar" : "Crear"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
