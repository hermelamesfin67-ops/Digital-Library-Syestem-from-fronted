import { BookmarkCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import image from "../../public/book.jpeg"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { ROLE } from '@/constants';
import BorrowBook from '../book/borrow-book';
import { useSession } from 'next-auth/react';

function BookCard({ book }: { book: Book }) {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type
    const isAvailable = Number(book.available_copies) > 0;

    return (
        <Link
            href={`/home/${book.id}`}
            className="group bg-white rounded-xl border border-stone-200/90 hover:border-stone-400/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden p-4 sm:p-5"
        >
            {/* Top Card Area: Cover + Quick Metadata */}
            <div className="flex gap-4 sm:gap-5 items-start">
                <div className="w-32 h-32 overflow-hidden rounded">
                    <Image src={book?.image || image} alt="book"
                        width={100}
                        height={100}
                        className="w-32 h-32 object-cover rounded hover:scale-125 duration-100 delay-100"
                    />
                </div>

                {/* Book Info Column */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <div>
                        {/* Category & Format Pill */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200/80">
                                {book.category_display}
                            </span>
                        </div>

                        <h3
                            className="text-base sm:text-lg capitalize font-bold text-stone-900 leading-snug hover:text-blue-600 transition-colors cursor-pointer line-clamp-2"
                            title={book.title}
                        >
                            {book.title}
                        </h3>

                        <p className="text-xs font-medium text-stone-600 mt-1">
                            By {book.author_display}
                        </p>

                    </div>
                </div>
            </div>

            {/* Bottom Bar: Availability Status & Actions */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                {/* Availability Badge */}
                <div className="flex items-center gap-1.5 text-xs">
                    {isAvailable ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/70 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Available ({book.available_copies} left)</span>
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/70 text-[11px]">
                            <BookmarkCheck className="w-3.5 h-3.5" />
                            <span>All Borrowed (Reserve)</span>
                        </span>
                    )}
                </div>
                {(role === ROLE.Student || role === undefined) && isAvailable ?
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
                    : null
                }
            </div>
        </Link>
    )
}

export default BookCard