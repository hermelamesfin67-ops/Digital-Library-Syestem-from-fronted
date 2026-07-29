"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";

const queryClient = new QueryClient();
export default function AppProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}): React.ReactNode {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
