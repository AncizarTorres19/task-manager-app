import { ExitIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export function ButtonExit({ onClick }: { readonly onClick: () => void }) {
    return (
        <Button variant="outline" size="icon" onClick={onClick}>
            <ExitIcon className="h-4 w-4" />
        </Button>
    )
}
