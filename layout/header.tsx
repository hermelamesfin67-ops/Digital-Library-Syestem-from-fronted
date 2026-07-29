"use client"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

function Header() {
    const { data: session } = useSession()

    return (
        <div className="flex justify-end w-full p-5">

            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />} className={"bg-transparent"}>
                    <div className="flex flex-col">
                        <p className="text-sm text-center font-semibold capitalize">
                            {session?.user?.user?.username}
                        </p>
                        <p className="text-xs font-light capitalize">
                            {session?.user?.user?.role}
                        </p>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => signOut({ redirect: false })}>Logout</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default Header