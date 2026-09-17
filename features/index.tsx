import { routes } from "@/lib/routes";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function Home() {
    const session = await getSession();
    redirect(session ? routes.home : routes.signIn);
    return null
}

export default Home