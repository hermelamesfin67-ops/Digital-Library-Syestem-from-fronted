"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react'
import { formatDate } from '@/utils'

function BorrowLists() {
    const borrowsData = useFetchData(
        [queryKeys.getAllBorrows],
        "api/borrows/"
    )
    const borrows: Borrows[] = borrowsData.data

    return (
        <div className="flex flex-col gap-4">
            All Borrows

            <div className="w-full max-w-screen overflow-hidden">
                <Table className="bg-white rounded-md overflow-auto">
                    <TableCaption>A list of borrowed books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Borrowed Date</TableHead>
                            <TableHead>Return Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>List of Books</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {borrowsData.isFetching ?
                            <Loader2 className="animate-spin" />
                            : borrows?.map((borrows, index) => (
                                <TableRow key={index}>
                                    <TableCell className='capitalize'>
                                        {borrows?.user_Display}
                                    </TableCell>
                                    <TableCell>{formatDate(borrows?.created_at)}</TableCell>
                                    <TableCell>{formatDate(borrows?.due_date)}</TableCell>
                                    <TableCell className='capitalize'>
                                        {borrows?.status}
                                    </TableCell>
                                    <TableCell>{borrows?.items?.map((book) => `${book.book_title} (${book?.quantity})`)?.join(", ")}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default BorrowLists