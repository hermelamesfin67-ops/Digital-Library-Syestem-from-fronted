"use client"
import BookLoader from "@/components/shared/book-loader";
import Link from "next/link";
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddBook from "./add";
import { useState } from "react";
import { DeleteIcon, PencilIcon } from "lucide-react";
import ConfirmationModal from "../shared/confirmation-modal";
import { useQueryClient } from "@tanstack/react-query";
import ImagePreview from "../shared/image";
import { useSession } from "next-auth/react";
import { ROLE } from "@/constants";

function BooksManagement() {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    const role = session?.user?.user?.role

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingBookId, setEditingBookId] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const booksData = useFetchData(
        [queryKeys.getAllBooks],
        "api/books/"
    )
    const books: Book[] = booksData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Book Management">
                {role === ROLE.librarian &&
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger className={"bg-gradient p-1.5 px-2 rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                            Add Book
                        </DialogTrigger>
                        <DialogContent className={"min-w-lg w-full"}>
                            <AddBook setEditingBookId={setEditingBookId} setIsOpen={setIsEditOpen} />
                        </DialogContent>
                    </Dialog>
                }
            </PageHeader>

            Books Management

            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-5">
                {
                    booksData.isFetching ?
                        Array(20).fill(0).map((_, i) => (
                            <BookLoader key={i} />
                        ))
                        : books?.length ?
                            books?.map((b) => (
                                <div key={b?.id} className="flex flex-col gap-3 p-3 bg-white shadow hover:shadow-md rounded-lg">
                                    <Link href={`/books/${b.id}`} className="flex items-center gap-5">
                                        <ImagePreview src={b?.image || "/book1.png"} alt="book"
                                            width={100}
                                            height={100}
                                            className="w-20 h-28 object-cover hover:scale-105"
                                        />
                                        <div>
                                            <p className="capitalize text-cm font-bold">
                                                {b?.title}
                                            </p>
                                            <p className="capitalize text-xs font-normal">
                                                {b?.author_display}
                                            </p>
                                            <p className="capitalize text-xs font-medium">
                                                {b?.category_display}
                                            </p>
                                        </div>
                                    </Link>

                                    {role === ROLE.librarian &&
                                        <div className="grid md:grid-cols-2 text-sm">

                                            <Dialog
                                                open={isEditOpen && editingBookId === b.id}
                                                onOpenChange={(open) => {
                                                    if (open) {
                                                        setEditingBookId(b?.id)
                                                        setIsEditOpen(true)
                                                    } else {
                                                        setIsEditOpen(false)
                                                        setEditingBookId(null)
                                                    }
                                                }}>
                                                <DialogTrigger>
                                                    <div className="border p-3 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer">
                                                        <PencilIcon size={15} /> Edit
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className={"min-w-lg w-full"}>
                                                    <AddBook
                                                        key={b?.id}
                                                        id={b?.id}
                                                        title={b?.title}
                                                        author={b?.author_name}
                                                        category={b?.category_name}
                                                        total_copies={b?.total_copies}
                                                        available_copies={b?.available_copies}
                                                        image={b?.image}
                                                        setIsOpen={setIsEditOpen}
                                                        setEditingBookId={setEditingBookId}
                                                    />
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                                <DialogTrigger>
                                                    <div className="border p-3 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer">
                                                        <DeleteIcon size={15} /> Delete
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className={"min-w-lg w-full"}>
                                                    <ConfirmationModal
                                                        title="Delete this book"
                                                        description={`${b?.title}`}
                                                        url={`api/books/${b?.id}/`}
                                                        method="DELETE"
                                                        onSuccess={() => {
                                                            queryClient.invalidateQueries({ queryKey: [queryKeys.getAllBooks] });
                                                            setIsOpen(false)
                                                        }}
                                                        successMessage="Book successfully deleted."
                                                        body={{}}
                                                    />
                                                </DialogContent>
                                            </Dialog>

                                        </div>
                                    }
                                </div>
                            ))
                            : "Empty Book List!"
                }
            </div>
        </div>
    )
}

export default BooksManagement
