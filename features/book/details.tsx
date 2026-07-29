"use client"

import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import AddBook from "./add"
import { useState } from "react"

function BookDetails({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const booksData = useFetchData(
        [queryKeys.getAllBooks, id],
        `${queryKeys.getAllBooks}${id}`
    )
    const book: Book = booksData.data
    return (
        <div className="mx-auto max-w-4xl w-full">
            <div className="flex gap-5">
                <Image
                    src={book?.image}
                    alt={book?.title}
                    width={100}
                    height={100}
                    quality={100}
                    priority
                    className="h-48 w-auto object-contain flex items-center justify-center"
                />
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-1.5">
                        <div className="leading-3">
                            <span className="text-xs text-[#626262]">Book</span>
                            <h2 className="font-bold text-xl">{book?.title}</h2>
                        </div>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger className={"bg-gradient p-1 px-2 text-xs rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                                Edit Book
                            </DialogTrigger>
                            <DialogContent className={"min-w-lg w-full"}>
                                <AddBook
                                    id={book?.id}
                                    title={book?.title}
                                    author={book?.author_display}
                                    category={book?.category_display}
                                    total_copies={book?.total_copies}
                                    available_copies={book?.available_copies}
                                    image={book?.image}
                                    setIsOpen={setIsOpen}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid md:grid-cols-2 justify-between gap-5">
                        <div>
                            <p className="text-sm text-[#3D3D3D]">Author: <span className="font-semibold">{book?.author_display}</span></p>
                            <p className="text-sm text-[#3D3D3D]">Category: <span className="font-semibold">{book?.category_display}</span></p>
                            <p className="text-sm text-[#3D3D3D]">Total Copies: <span className="font-semibold">{book?.total_copies}</span></p>
                            <p className="text-sm text-[#3D3D3D]">Available Copies: <span className="font-semibold">{book?.available_copies}</span></p>
                        </div>
                        <div>
                            <p className="text-sm text-[#3D3D3D]">Publication Year: <span className="font-semibold">{"-"}</span></p>
                            <p className="text-sm text-[#3D3D3D]">Pages: <span className="font-semibold">{"-"}</span></p>
                            <p className="text-sm text-[#3D3D3D]">Rating: <span className="font-semibold">{"-"}</span></p>
                        </div>
                    </div>
                    <div>

                        <Button>Borrow</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails