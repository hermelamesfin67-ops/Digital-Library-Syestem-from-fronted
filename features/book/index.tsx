"use client"
import BookLoader from "@/components/shared/book-loader";
import Link from "next/link";
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import ImagePreview from "../shared/image";

function AllBooks() {
    const booksData = useFetchData(
        [queryKeys.getAllBooks],
        "api/books/"
    )
    const books: Book[] = booksData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Books" />

            All Books

            <div className="grid md:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
                {
                    booksData.isFetching ?
                        Array(20).fill(0).map((_, i) => (
                            <BookLoader key={i} />
                        ))
                        : books?.length ?
                            books?.map((b) => (
                                <Link
                                    href={`/books/${b.id}`}
                                    key={b.id} className="flex flex-col gap-1.5 p-5 bg-white shadow hover:shadow-md rounded-md">
                                    <ImagePreview src={b?.image || "/book1.png"} alt="book"
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
    )
}

export default AllBooks