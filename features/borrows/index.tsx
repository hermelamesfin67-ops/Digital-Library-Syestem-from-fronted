"use client"
import { queryKeys } from '@/api/query-keys'
import { useFetchData } from '@/api/use-fetch-data'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from 'lucide-react'
import { ROLE } from '@/constants'
import { useSession } from 'next-auth/react'
import Borrows from './borrows'

function BorrowLists() {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type

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
                            {role === ROLE.Librarian &&
                                <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {borrowsData.isFetching ?
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <Loader2 className="animate-spin inline" />
                                </TableCell>
                            </TableRow>
                            : borrows?.map((borrows, index) => (
                                <Borrows borrows={borrows} key={index} />
                            ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default BorrowLists