//ui
import { Button } from "@/components/ui/button";
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
//Interfaces
import { AuthCardProps } from "./interfaces";

export function AuthCard({ title, description, textButton, onSubmit, register, moodRegister }: Readonly<AuthCardProps>) {
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {moodRegister && (
            <div className="space-y-1">
              <Label htmlFor="password">Nombre de usuario</Label>
              <Input id="name" {...register("name", { required: true })} />
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" type="email" {...register("email", { required: true })} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...register("password", { required: true })} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{textButton}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
