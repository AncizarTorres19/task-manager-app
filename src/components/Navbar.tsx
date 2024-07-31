'use client';

import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ModeToggle } from './ThemeToggleButton';
import { ButtonExit } from './ButtonExit';
import useUserSession from '@/hooks/useUserSession';

export const Navbar = () => {

    const { userInSession } = useUserSession();

    // Función para cerrar sesión
    const logOut = () => {
        sessionStorage.clear();
        window.location.href = '/';
        window.dispatchEvent(new Event('sessionStorageChange'));
    }

    return (
        <nav className="flex justify-between py-5">
            {userInSession && (
                <Link href="/">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Aplicación de Gestión de Tareas
                    </h1>
                </Link>
            )}
            <div className="flex gap-x-2 items-center">
                {userInSession && (
                    <Link href="/newTaks" className={buttonVariants({ variant: "secondary" })}>
                        Crear tarea
                    </Link>
                )}
                <ModeToggle />
                {userInSession && (<ButtonExit onClick={logOut} />)}
            </div>
        </nav>
    );
}
