import useDynamicMutation from '@/api/use-post-data'
import { Button } from '@/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { routes } from '@/lib/routes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function BorrowBook({ book }: { book: Book }) {
    const router = useRouter()
    const { data: session } = useSession()
    const postMutation = useDynamicMutation({})

    const borrowHandler = async () => {

        try {
            await postMutation.mutateAsync({
                url: "api/borrows/",
                method: "POST",
                body: {
                    items: [
                        {
                            "book": book.id,
                            "quantity": 1
                        }

                    ]
                },
                onSuccess: () => {
                    toast.success("Book Borrowed Successfully")
                    router.push(routes.borrows)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (!session) {
        toast.info("Login required.")
        setTimeout(() => {
            router.replace(routes.signIn)
        }, 300);
        return null
    } else
        return (
            <div>
                <DialogHeader>
                    <DialogTitle>Confirm Borrow</DialogTitle>
                    <DialogDescription>
                        You&apos;re borrowing {book?.title} book click the confirmation below
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button
                        disabled={postMutation.isPending}
                        onClick={borrowHandler} type="button" variant={"primary"}>
                        {postMutation.isPending ? "Submitting" : "Confirm"}

                    </Button>
                </DialogFooter>
            </div>
        )
}

export default BorrowBook