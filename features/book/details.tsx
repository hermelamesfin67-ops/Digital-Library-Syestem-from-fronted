"use client"

import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"
import { Button } from "@/components/ui/button"
import { ROLE } from "@/constants"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

function BookDetails({ id }: { id: string }) {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type

    const booksData = useFetchData(
        [queryKeys.getAllBooks, id],
        `api/books/${id}`
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
                            <h2 className="font-bold text-2xl capitalize">{book?.title}</h2>
                        </div>
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
                        {role === ROLE.Member &&
                            <Button variant={"secondary"}>Borrow</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails