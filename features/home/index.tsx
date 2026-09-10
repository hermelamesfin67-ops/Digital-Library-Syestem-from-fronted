"use client"
import { useFetchData } from "@/api/use-fetch-data"
import HeroSlider from "./slider"
import { queryKeys } from "@/api/query-keys"
import BookLoader from "@/components/shared/book-loader"
import Link from "next/link"
import PageHeader from "@/components/shared/page-header"
import image from "../../public/book.jpeg"
import Image from "next/image"

function HomePage() {
    const booksData = useFetchData(
        [queryKeys.getAllBooks],
        "api/books/",
        undefined,
        undefined,
        true
    )
    const books: Book[] = booksData.data

    return (
        <div className="flex flex-col gap-4 w-full mx-auto max-w-5xl p-5">
            <h3 className="text-center text-2xl font-semibold py-5">Library Management System</h3>

            <HeroSlider />

            <div className="flex flex-col gap-3 py-5">
                <PageHeader title="Available Books in the Library" />
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-5">
                    {
                        booksData.isFetching ?
                            Array(20).fill(0).map((_, i) => (
                                <BookLoader key={i} />
                            ))
                            : books?.length ?
                                books?.map((b) => (
                                    <Link
                                        href={`/home/${b.id}`}
                                        key={b.id} className="block rounded border bg-white p-4 shadow hover:shadow-md">
                                        <div className="w-full h-48 overflow-hidden rounded">
                                            <Image src={b?.image || image} alt="book"
                                                width={100}
                                                height={100}
                                                className="w-full h-48 object-cover rounded hover:scale-125 duration-100 delay-100"
                                            />
                                        </div>
                                        <p className="capitalize text-sm font-normal">
                                            {b?.title}
                                        </p>
                                    </Link>
                                ))
                                : "No Book Found!"
                    }
                </div>
            </div>

        </div>
    )
}

export default HomePage