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
import { routes } from "@/lib/routes";
import { BookImageIcon } from "lucide-react";
import Link from "next/link";

function Header() {
    const { data: session } = useSession()

    if (!session) return <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
            <div className="flex items-center gap-1 font-bold text-sm">
                <BookImageIcon />
                Digital Library
            </div>
            <Link href={routes.signIn}>
                <Button
                    type="submit"
                    className={"w-fit"}
                    variant={"primary"}
                >
                    Login
                </Button>
            </Link>
        </div>
    </header>



    if (session) {
        return (
            <div className="flex items-center justify-baseline gap-3">
                {/* Mobile View Drawer */}
                <MobileSideMenu />

                <div className="flex justify-end w-full p-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" />} className={"bg-transparent cursor-pointer"}>
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
}

export default Header