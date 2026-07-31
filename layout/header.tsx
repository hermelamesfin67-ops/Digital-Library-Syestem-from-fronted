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
import MobileSideMenu from "./mobile-side-menu"

function Header() {
    const { data: session } = useSession()

    return (
        <div className="flex items-center justify-baseline gap-3">
            {/* Mobile View Drawer */}
            <MobileSideMenu />

            <div className="flex justify-end w-full p-5">
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" />} className={"bg-transparent"}>
                        <div className="flex flex-col">
                            <p className="text-sm text-center font-semibold capitalize">
                                {session?.user?.user?.username}
                            </p>
                            <p className="text-xs font-light capitalize">
                                {session?.user?.user?.role || session?.user.user.account_type}
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
        </div>
    )
}

export default Header