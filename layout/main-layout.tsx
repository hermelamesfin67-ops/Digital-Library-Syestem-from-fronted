"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./side-menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="flex gap-1 h-screen">
            <QueryClientProvider client={queryClient}>
                <SidebarProvider>
                    <section className="hidden md:block h-full">
                        <AppSidebar />
                    </section>
                    <div className="flex flex-col gap-1 h-full flex-1">
                        <header className="p-3 text-center">-</header>
                        <section className="p-3">
                            {children}
                        </section>
                    </div>
                </SidebarProvider>
            </QueryClientProvider>
        </div>
    )
}

export default MainLayout