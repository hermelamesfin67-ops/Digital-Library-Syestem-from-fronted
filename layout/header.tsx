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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function Header() {
    const { data: session } = useSession()

    if (!session) return <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200/90 text-stone-900 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-colors shadow-2xs">
                <BookImageIcon className="w-7 h-7" />
            </div>
            <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                Digital Library
            </span>
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
                        <DropdownMenuTrigger render={<Button variant="outline" />} className={"bg-transparent flex items-center gap-3 cursor-pointer border-none!"}>
                            <div className="flex flex-col">
                                <p className="text-sm text-center font-semibold capitalize">
                                    {session?.user?.user?.username}
                                </p>
                                <p className="text-xs font-light capitalize">
                                    {session?.user?.user?.role || session?.user.user.account_type}
                                </p>
                            </div>
                            <Avatar>
                                {/* <AvatarImage src="/book-category.jpeg" /> */}
                                <AvatarFallback className={"capitalize"}>{session?.user?.user?.username?.charAt(0)}</AvatarFallback>
                            </Avatar>
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