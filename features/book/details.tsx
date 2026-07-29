"use client"

import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddBook from "./add"
import { useState } from "react"
import { Loader2, PencilIcon } from "lucide-react"

function BookDetails({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const booksData = useFetchData(
        [queryKeys.getAllBooks, id],
        `${queryKeys.getAllBooks}${id}`
    )
    const book: Book = booksData.data
    if (booksData.isFetching) return <Loader2 className="animate-spin" />

    return (
        <div className="mx-auto max-w-4xl w-full">
            <div className="flex gap-5">
                { // eslint-disable-next-line @next/next/no-img-element
                    <img
                        loading="lazy"
                        src={book?.image || "/book1.png"}
                        alt={book?.title}
                        width={100}
                        height={100}
                        className="h-48 w-48 object-cover flex items-center justify-center"
                    />}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center gap-1.5">
                        <div className="leading-3">
                            <span className="text-xs text-[#626262]">Book</span>
                            <h2 className="font-bold text-xl">{book?.title}</h2>
                        </div>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger>
                                <Button size={"sm"} variant="primary">
                                    <PencilIcon />
                                    Edit
                                </Button>
                            </DialogTrigger>
                            <DialogContent className={"min-w-lg w-full"}>
                                <AddBook
                                    id={book?.id}
                                    title={book?.title}
                                    author={book?.author_name}
                                    category={book?.category_name}
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

                        <Button variant={"secondary"}>Borrow</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails