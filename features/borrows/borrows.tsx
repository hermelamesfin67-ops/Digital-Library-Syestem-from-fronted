import { formatDate } from '@/utils'
import { Loader2, RotateCwIcon } from 'lucide-react';
import Status from '@/components/status'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import useDynamicMutation from '@/api/use-post-data'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TableCell, TableRow } from '@/components/ui/table';
import { useSession } from 'next-auth/react';
import { queryKeys } from '@/api/query-keys';
import { ROLE } from '@/constants';

function Borrows({ borrows }: { borrows: Borrows }) {
    const { data: session } = useSession()
    const role = session?.user?.user?.role || session?.user.user.account_type

    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({})

    const returnBorrowHandler = async (id: number) => {
        try {
            await postMutation.mutateAsync({
                url: `api/borrows/${id}/return/`,
                method: "PATCH",
                body: {},
                onSuccess: () => {
                    toast.success("Book Returned Successfully")
                    queryClient.invalidateQueries({ queryKey: [queryKeys.getAllBorrows] })
                },
            });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <TableRow>
            <TableCell className='capitalize'>
                {borrows?.user_Display}
            </TableCell>
            <TableCell>{formatDate(borrows?.created_at)}</TableCell>
            <TableCell>{formatDate(borrows?.due_date)}</TableCell>
            <TableCell className='capitalize'>
                {Status(borrows?.status)}
            </TableCell>
            <TableCell>{borrows?.items?.map((book) => `${book.book_title} (${book?.quantity})`)?.join(", ")}</TableCell>
            {role === ROLE.Librarian && <TableCell>
                {borrows?.status?.toUpperCase() === "BORROWED" &&
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="p-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
                                {postMutation.isPending ? <Loader2 className="animate-spin inline" /> : <RotateCwIcon size={15} onClick={() => returnBorrowHandler(borrows?.items[0]?.borrow)} />}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Return Book</p>
                        </TooltipContent>
                    </Tooltip>
                }
            </TableCell>
            }
        </TableRow>
    )
}

export default Borrows