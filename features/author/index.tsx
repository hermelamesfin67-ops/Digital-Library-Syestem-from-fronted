"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddAuthor from "./add";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ImagePreview from "../shared/image";
import { Loader2, PencilIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { ROLE } from "@/constants";

function AllAuthors() {
    const { data: session } = useSession()
    const role = session?.user?.user?.role

    const [isOpen, setIsOpen] = useState(false)
    const [editingAuthorId, setEditingAuthorId] = useState<number | null>(null)

    const authorsData = useFetchData(
        [queryKeys.getAllAuthors],
        "api/authors/"
    )
    const author: Authors[] = authorsData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Author Management">
                {role === ROLE.librarian &&
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger className={"bg-gradient p-1.5 px-2 rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                            Add Author
                        </DialogTrigger>
                        <DialogContent className={"min-w-lg w-full"}>
                            <AddAuthor setEditingAuthorId={setEditingAuthorId} setIsOpen={setIsOpen} />
                        </DialogContent>
                    </Dialog>}
            </PageHeader>

            All authors

            <div className="w-full max-w-screen overflow-hidden">
                <Table className="bg-white rounded-md overflow-auto">
                    <TableCaption>A list of authors.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Author Name</TableHead>
                            <TableHead>Biography</TableHead>
                            <TableHead>Book count</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {authorsData.isFetching ?
                            <Loader2 className="animate-spin" />
                            : author?.map((author) => (
                                <TableRow key={author.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <ImagePreview src={author?.image} alt={author?.name} className="w-6 h-6 rounded-full" />
                                            {author?.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{author?.biography}</TableCell>
                                    <TableCell>{author?.book_count}</TableCell>
                                    <TableCell>
                                        {role === ROLE.librarian &&
                                            <Dialog
                                                open={isOpen && editingAuthorId === author.id}
                                                onOpenChange={(open) => {
                                                    if (open) {
                                                        setEditingAuthorId(author?.id)
                                                        setIsOpen(true)
                                                    } else {
                                                        setIsOpen(false)
                                                        setEditingAuthorId(null)
                                                    }
                                                }}>
                                                <DialogTrigger>
                                                    <div className="p-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
                                                        <PencilIcon size={15} />
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className={"min-w-lg w-full"}>
                                                    <AddAuthor
                                                        key={author?.id}
                                                        id={author?.id}
                                                        name={author?.name}
                                                        biography={author?.biography}
                                                        book_count={author?.book_count}
                                                        image={author?.image}
                                                        setIsOpen={setIsOpen}
                                                        setEditingAuthorId={setEditingAuthorId}
                                                    />
                                                </DialogContent>
                                            </Dialog>}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default AllAuthors