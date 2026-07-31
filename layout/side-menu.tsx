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
    { name: "Dashboard", url: "/", permission: ["super admin", "librarian", "student"] },
    { name: "Books Management", url: "/books-management", permission: ["super admin", "librarian"] },
    { name: "All Books", url: "/books", permission: ["student"] },
    { name: "Categories", url: "/categories", permission: ["super admin", "librarian"] },
    { name: "Authors", url: "/authors", permission: ["super admin", "librarian"] },
    { name: "Borrows", url: "", permission: ["super admin", "librarian", "student"] },
]
export function AppSidebar() {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || ""

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