import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { ModeToggle } from './ThemeToggleButton'

export const Navbar = () => {
    return (
        <nav className="flex justify-between py-5">
            <Link href="/">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Aplicación de Gestión de Tareas
                </h1>
            </Link>

            <div className="flex gap-x-2 items-center">
                <Link href="/newTaks" className={buttonVariants({ variant: "secondary" })}>
                    Crear tarea
                </Link>
                <ModeToggle />
            </div>
        </nav>
    )
}
