"use client"
import Image from "next/image"
import BookLoader from "@/components/shared/book-loader";
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCategory from "./add";
import { useState } from "react";

function AllCategories() {
    const [isOpen, setIsOpen] = useState(false)
    const categoriesData = useFetchData(
        [queryKeys.getAllCategories],
        queryKeys.getAllCategories
    )
    const books: Book[] = categoriesData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Book Management">

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger className={"bg-gradient p-1.5 px-2 rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                        Add Category
                    </DialogTrigger>
                    <DialogContent className={"min-w-lg w-full"}>
                        <AddCategory setIsOpen={setIsOpen} />
                    </DialogContent>
                </Dialog>
            </PageHeader>

            All Books

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {
                    categoriesData.isFetching ?
                        Array(20).fill(0).map((_, i) => (
                            <BookLoader key={i} />
                        ))
                        : books?.length ?
                            books?.map((b) => (
                                <div key={b.id} className="flex flex-col gap-1.5">
                                    <Image src={b?.image || "/book1.png"} alt="book"
                                        width={100}
                                        height={100}
                                        className="w-full h-48 object-cover"
                                    />
                                    <p className="capitalize text-sm font-normal">
                                        {b?.title}
                                    </p>
                                </div>
                            ))
                            : "No Category Found!"
                }
            </div>
        </div>
    )
}

export default AllCategories