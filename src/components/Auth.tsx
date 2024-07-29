'use client';

import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AuthCard } from "./AuthCard";

import axiosClient from "@/app/config/AxiosClient";

import { AuthFormData } from "./interfaces";

export function Auth({ setUserInSession }: { readonly setUserInSession: (user: string) => void }) {

  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<AuthFormData>();

  const handleLogin = async (data: AuthFormData) => {
    try {
      const response = await axiosClient.post<{ msg: string, ok: boolean, token: string, user: string }>('/login', data);
      const { token, user } = response.data;
      console.log(response.data);
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: "Bienvenido de vuelta",
      });
      sessionStorage.setItem('token', token);
      setUserInSession(user);
    } catch (error) {
      toast({
        title: "Uh oh! Error en la autenticación",
        description: (error as any).response.data.msg || "Ocurrió un error al intentar iniciar sesión",
      });
      console.error(error);
    }
  }

  const handleRegister = (data: AuthFormData) => {
    try {
      axiosClient.post('login/new', data);
      toast({
        title: "¡Registro exitoso!",
        description: "Ahora puedes iniciar sesión",
      });
      reset();
    } catch (error) {
      toast({
        title: "Uh oh! Error en el registro",
        description: (error as any).response.data.msg || "Ocurrió un error al intentar registrarse",
      });
      console.error(error);
    }
  }

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
        <TabsTrigger value="register">Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <AuthCard
          description="Bienvenido de vuelta. Inicia sesión para continuar."
          onSubmit={handleSubmit(handleLogin)}
          register={register}
          textButton="Iniciar sesión"
          title="Aplicación de Gestión de Tareas"
        />
      </TabsContent>
      <TabsContent value="register">
        <AuthCard
          description="Crea una cuenta para empezar a gestionar tus tareas."
          onSubmit={handleSubmit(handleRegister)}
          register={register}
          textButton="Registrarse"
          title="Aplicación de Gestión de Tareas"
          moodRegister={true}
        />
      </TabsContent>
    </Tabs>
  );
}
