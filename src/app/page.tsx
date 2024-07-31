'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
//Components
import { AuthCard } from "@/components/AuthCard";
import { AuthFormData } from "@/components/interfaces";
import { ModeToggle } from "@/components/ThemeToggleButton";
import { Spinner } from "@/components/Spinner";
//Axios
import axiosClient from "./config/AxiosClient";
//ui
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
//Hooks
import useUserSession from "@/hooks/useUserSession";

const Page = () => {

  const { toast } = useToast();

  const { userInSession } = useUserSession();

  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<AuthFormData>();

  const [hydrated, setHydrated] = useState<boolean>(false);

  const handleLogin = async (data: AuthFormData) => {
    setHydrated(false);
    try {
      const response = await axiosClient.post<{ msg: string, ok: boolean, token: string, user: string }>('/login', data);
      const { token, user } = response.data;
      toast({
        title: "¡Inicio de sesión exitoso!",
        description: "Bienvenido de vuelta",
      });
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      reset();
      router.push('/tasks');
    } catch (error) {
      toast({
        title: "Uh oh! Error en la autenticación",
        description: (error as any).response?.data?.msg || "Ocurrió un error al intentar iniciar sesión",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setHydrated(true);
    }
  }

  const handleRegister = (data: AuthFormData) => {
    setHydrated(false);
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
        description: (error as any).response?.data?.msg || "Ocurrió un error al intentar registrarse",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setHydrated(true);
    }
  }

  useEffect(() => {
    if (userInSession) {
      router.push('/tasks');
    }
  }, [userInSession]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <Spinner />;
  }

  return (
    <>
      <nav className="flex justify-between py-5">
        <div className="flex gap-x-2 items-center">
          <ModeToggle />
        </div>
      </nav>
      <div className="flex justify-center items-center h-auto">
        <Tabs defaultValue="login" className="w-[450px]">
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
      </div>
    </>
  );
};

export default Page;
