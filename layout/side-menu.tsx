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
import Link from "next/link"
import { usePathname } from "next/navigation"

const projects = [
    { name: "Dashboard", url: "/" },
    { name: "All Books", url: "/books" },
    { name: "Categories", url: "" },
    { name: "Authors", url: "" },
    { name: "Borrow", url: "" },
]
export function AppSidebar() {

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
                {projects.map((project) => (
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