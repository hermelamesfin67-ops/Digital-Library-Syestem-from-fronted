"use client"
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddBook from "./add";
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

function AllAuthors() {
    const [isOpen, setIsOpen] = useState(false)
    const authorsData = useFetchData(
        [queryKeys.getAllAuthors],
        "api/authors/"
    )
    const authors: Authors[] = authorsData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Author Management">

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger className={"bg-gradient p-1.5 px-2 rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                        Add Author
                    </DialogTrigger>
                    <DialogContent className={"min-w-lg w-full"}>
                        <AddBook setIsOpen={setIsOpen} />
                    </DialogContent>
                </Dialog>
            </PageHeader>

            All authors


            <Table>
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
                    {authors?.map((author) => (
                        <TableRow key={author.id}>
                            <TableCell>
                                <div className="flex items-center gap-1.5">
                                    {author?.name}
                                    <ImagePreview src={author?.image} alt={author?.name} className="w-10 h-10" />
                                </div>
                            </TableCell>
                            <TableCell>{author?.biography}</TableCell>
                            <TableCell>{author?.book_count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllAuthors