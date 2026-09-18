"use client"
import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"
import { Button } from "@/components/ui/button"
import { ROLE } from "@/constants"
import { BookmarkCheck, CheckCircle2, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import image from "../../public/book.jpeg"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import BorrowBook from "./borrow-book"

function BookDetails({ id, isPublic }: { id: string, isPublic?: boolean }) {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type

    const booksData = useFetchData(
        [queryKeys.getAllBooks, id],
        `api/books/${id}`,
        undefined,
        undefined,
        isPublic
    )

    const book: Book = booksData.data
    const borrowedCopies = Number(book?.total_copies) - Number(book?.available_copies)
    if (booksData.isFetching) return <Loader2 className="animate-spin" />

    return (
        <div className={isPublic ? "flex flex-col gap-4 w-full mx-auto max-w-5xl p-5" : "mx-auto max-w-4xl w-full"}>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="aspect-square overflow-hidden rounded bg-gray-100">
                    <Image
                        src={book?.image || image}
                        alt={book?.title}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover flex items-center justify-center"
                    />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center gap-1.5">
                        <div className="leading-3">
                            <span className="text-[10px]">
                                Book
                            </span>
                            <h3
                                className="text-base sm:text-lg capitalize font-bold text-stone-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
                                title={book.title}
                            >
                                {book.title}
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <div>
                            <p className="text-xs font-medium text-stone-600 mt-1">
                                By {book.author_display}
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200/80">
                                    {book.category_display}
                                </span>
                            </div>
                        </div>
                        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2 w-full max-w-sm">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-stone-700">Shelf Availability</span>
                                <span className="font-bold text-stone-900">
                                    {book?.available_copies} of {book?.total_copies} Available
                                </span>
                            </div>
                            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden flex">
                                <div
                                    className="bg-emerald-600 h-full"
                                    style={{
                                        width: `${Number(book?.total_copies) > 0 ? (Number(book?.available_copies) / Number(book?.total_copies)) * 100 : 0}%`,
                                    }}
                                />
                                <div
                                    className="bg-amber-500 h-full"
                                    style={{
                                        width: `${Number(book?.total_copies) > 0 ? (borrowedCopies / Number(book?.total_copies)) * 100 : 0}%`,
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-stone-500">
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {book?.available_copies} on shelves
                                </span>
                                <span className="text-amber-700 font-medium flex items-center gap-1">
                                    <BookmarkCheck className="w-3 h-3" />
                                    {borrowedCopies} on active loans
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {(role === ROLE.Student || role === undefined) &&
                            <Dialog>
                                <DialogTrigger
                                    render={
                                        <Button size="sm" variant="primary" />
                                    }
                                >
                                    Borrow
                                </DialogTrigger>

                                <DialogContent className="md:min-w-lg w-full">
                                    <BorrowBook book={book} />
                                </DialogContent>
                            </Dialog>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails