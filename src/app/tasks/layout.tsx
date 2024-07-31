
import { ReactNode } from "react"
//Components
import { Navbar } from "@/components/Navbar"

const TaskLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default TaskLayout
