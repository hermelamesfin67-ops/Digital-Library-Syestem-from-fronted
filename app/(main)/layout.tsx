
"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layout/side-menu";
import Header from "@/layout/header";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession()
  useEffect(() => {
    if (!session) {
      signOut()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <SidebarProvider>
      <section className="hidden md:block h-full">
        <AppSidebar />
      </section>
      <div className="flex flex-col gap-1 h-full flex-1">
        <Header />
        <section className="p-5">
          {children}
        </section>
      </div>
    </SidebarProvider>
  );
}
