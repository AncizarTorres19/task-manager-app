'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Components
import { ButtonExit } from './ButtonExit';
import { ModeToggle } from './ThemeToggleButton';
//ui
import { buttonVariants } from './ui/button';

export const Navbar = () => {

    const router = useRouter();

    // Función para cerrar sesión
    const logOut = () => {
        sessionStorage.clear();
        router.push('/');
    }

    return (
        <nav className="flex flex-col md:flex-row justify-between py-5 px-4">
            <Link href="/tasks">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Aplicación de Gestión de Tareas
                </h1>
            </Link>
            <div className="flex md:flex-row gap-y-2 gap-x-2 md:gap-x-2 items-center justify-end mt-4 md:mt-0">
                <Link href="/tasks/create" className={buttonVariants({ variant: "secondary" })}>
                    Crear tarea
                </Link>
                <ModeToggle />
                <ButtonExit onClick={logOut} />
            </div>
        </nav>

    );
}
