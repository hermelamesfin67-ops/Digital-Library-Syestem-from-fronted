"use client"
import { routes } from "@/lib/routes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function Home() {
    const router = useRouter()

    useEffect(() => {
        router.push(routes.home)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return null
}

export default Home