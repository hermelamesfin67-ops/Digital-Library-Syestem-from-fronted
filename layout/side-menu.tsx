"use client"
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookImageIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const menus = [
    { name: "Dashboard", url: "/", permission: ["Superuser", "Librarian", "Member"] },
    { name: "Books Management", url: "/books-management", permission: ["Superuser", "Librarian"] },
    { name: "All Books", url: "/books", permission: ["Member"] },
    { name: "Categories", url: "/categories", permission: ["Superuser", "Librarian"] },
    { name: "Authors", url: "/authors", permission: ["Superuser", "Librarian"] },
    { name: "Borrows", url: "", permission: ["Superuser", "Librarian", "Member"] },
]
export function AppSidebar() {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type || ""

    const filteredMenus = () => {
        return menus.filter((menu) => menu.permission.includes(role))
    }
    const pathName = usePathname()
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-1 font-bold text-sm">
                    <BookImageIcon />
                    Digital Library
                </div>
            </SidebarHeader>
            <SidebarMenu>
                {filteredMenus()?.map((project) => (
                    <SidebarMenuItem key={project.name}>
                        <SidebarMenuButton isActive={pathName === project.url} >
                            <Link href={project.url} className="w-full h-full">
                                <span className="text-xs">{project.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarFooter />
        </Sidebar>
    )
}