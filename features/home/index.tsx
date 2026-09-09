"use client"
import { useFetchData } from "@/api/use-fetch-data"
import HeroSlider from "./slider"
import { queryKeys } from "@/api/query-keys"
import BookLoader from "@/components/shared/book-loader"
import Link from "next/link"
import ImagePreview from "../shared/image"
import PageHeader from "@/components/shared/page-header"

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
                                        key={b.id} className="flex flex-col gap-1.5 p-5 bg-white shadow hover:shadow-md rounded-md">
                                        <ImagePreview src={b?.image || "/book.jpeg"} alt="book"
                                            width={100}
                                            height={100}
                                            className="w-full h-48 object-cover hover:scale-105"
                                        />
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