import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { BookImageIcon, MenuIcon } from "lucide-react"
import { menus } from "./side-menu"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

function MobileSideMenu() {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type || ""

    const filteredMenus = () => {
        return menus.filter((menu) => menu.permission.includes(role))
    }
    const pathName = usePathname()

    return (
        <div className="block md:hidden">
            <Drawer swipeDirection="left">
                <DrawerTrigger><MenuIcon className="mx-2" /></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <div className="flex items-center gap-1 font-bold text-sm">
                            <BookImageIcon />
                            Digital Library
                        </div>
                    </DrawerHeader>
                    <div className="p-3 py-5 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            {filteredMenus()?.map((project) => (
                                <div key={project.name}>
                                    <Link href={project.url} className={cn("p-2 pr-5 rounded-md text-xs hover:bg-gray-50 w-full", pathName === project.url && "bg-gray-100")}>
                                        {project.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default MobileSideMenu