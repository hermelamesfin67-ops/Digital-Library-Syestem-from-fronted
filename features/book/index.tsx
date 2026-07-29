"use client"
import Image from "next/image"
import BookLoader from "@/components/shared/book-loader";
import Link from "next/link";
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddBook from "./add";
import { useState } from "react";

function AllBooks() {
    const [isOpen, setIsOpen] = useState(false)
    const booksData = useFetchData(
        [queryKeys.getAllBooks],
        queryKeys.getAllBooks
    )
    const books: Book[] = booksData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Book Management">

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger className={"bg-gradient p-1.5 px-2 rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                        Add Book
                    </DialogTrigger>
                    <DialogContent className={"min-w-lg w-full"}>
                        <AddBook setIsOpen={setIsOpen} />
                    </DialogContent>
                </Dialog>
            </PageHeader>

            All Books

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
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
                                    <Image src={b?.image || "/book1.png"} alt="book"
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