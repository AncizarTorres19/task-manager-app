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

export function TaskForm() {
  enum PriorityEnum {
    Low = "low",
    Medium = "medium",
    High = "high",
    Urgent = "urgent",
  }

  interface IFormInput {
    description: string;
    enabled: boolean;
    id?: number;
    name: string;
    priority: PriorityEnum;
  }

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   control,
  //   formState: { errors },
  // } = useForm<IFormInput>()

  // const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  // const watchedId = watch("id");

  return (
    <form /* onSubmit={handleSubmit(onSubmit)} */>
      <input type="hidden" /* {...register("id")} */ />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Crear tarea</CardTitle>
          <CardDescription>
          cd
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                // {...register("name", { required: true })}
                name="name"
                id="name"
                placeholder="Nombre de la tarea"
              />
              {/* {errors.name && <span>Name is required</span>} */}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                // {...register("description", { required: true })}
                name="description"
                id="description"
                placeholder="Descripción de la tarea"
              />
              {/* {errors.description && <span>Description is required</span>} */}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value={PriorityEnum.Low}>Baja</SelectItem>
                      <SelectItem value={PriorityEnum.Medium}>Media</SelectItem>
                      <SelectItem value={PriorityEnum.High}>Alta</SelectItem>
                      <SelectItem value={PriorityEnum.Urgent}>Urgente</SelectItem>
                    </SelectContent>
                  </Select>
              {/* <Controller
                name="priority"
                control={control}
                defaultValue={PriorityEnum.Low} // Asegura un valor por defecto
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value={PriorityEnum.Low}>Baja</SelectItem>
                      <SelectItem value={PriorityEnum.Medium}>Media</SelectItem>
                      <SelectItem value={PriorityEnum.High}>Alta</SelectItem>
                      <SelectItem value={PriorityEnum.Urgent}>Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              /> */}
              {/* {errors.priority && <span>Priority is required</span>} */}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Cancel
          </Link>
          <Button type="submit">
            {/* {watchedId ? "Actualizar" : "Crear"} */}
            Crear
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
