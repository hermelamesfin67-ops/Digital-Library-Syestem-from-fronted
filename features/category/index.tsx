"use client"
import BookLoader from "@/components/shared/book-loader";
import { queryKeys } from "@/api/query-keys";
import { useFetchData } from "@/api/use-fetch-data";
import PageHeader from "@/components/shared/page-header";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddCategory from "./add";
import { useState } from "react";
import { ROLE } from "@/constants";
import { useSession } from "next-auth/react";
import ConfirmationModal from "../shared/confirmation-modal";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, PencilIcon } from "lucide-react";
import ImagePreview from "../shared/image";

function AllCategories() {
    const queryClient = useQueryClient()
    const { data: session } = useSession()
    const role = session?.user?.user?.role

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)

    const categoriesData = useFetchData(
        [queryKeys.getAllCategories],
        "api/categories/"
    )
    const categories: Categories[] = categoriesData.data

    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Category Management">
                {role === ROLE.Librarian &&
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger className={"bg-gradient p-1.5 px-2 rounded-md hover:cursor-pointer focus:cursor-pointer"}>
                            Add Category
                        </DialogTrigger>
                        <DialogContent className={"md:min-w-lg w-full"}>
                            <AddCategory setEditingCategoryId={setEditingCategoryId} setIsOpen={setIsEditOpen} />
                        </DialogContent>
                    </Dialog>
                }
            </PageHeader>

            Category Lists

            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-5">
                {
                    categoriesData.isFetching ?
                        Array(20).fill(0).map((_, i) => (
                            <BookLoader key={i} />
                        ))
                        : categories?.length ?
                            categories?.map((cat) => (
                                <div key={cat?.id} className="flex flex-col gap-3 p-3 bg-white shadow hover:shadow-md rounded-lg">
                                    <div className="flex flex-col items-center gap-3">
                                        <ImagePreview src={"/book-category.jpeg"} alt="book"
                                            width={100}
                                            height={100}
                                            className="w-20 h-20 object-cover hover:scale-105"
                                        />
                                        <hr />
                                        <div>
                                            <p className="capitalize text-cm font-bold">
                                                {cat?.name}
                                            </p>

                                        </div>
                                    </div>

                                    {role === ROLE.Librarian &&
                                        <div className="grid md:grid-cols-2 text-sm">
                                            <Dialog open={isEditOpen && editingCategoryId === cat?.id}
                                                onOpenChange={(open) => {
                                                    if (open) {
                                                        setEditingCategoryId(cat?.id)
                                                        setIsEditOpen(true)
                                                    } else {
                                                        setIsEditOpen(false)
                                                        setEditingCategoryId(null)
                                                    }
                                                }}>
                                                <DialogTrigger>
                                                    <div className="border p-3 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer">
                                                        <PencilIcon size={15} /> Edit
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className={"md:min-w-lg w-full"}>
                                                    <AddCategory
                                                        key={cat?.id}
                                                        name={cat?.name}
                                                        description={cat?.descriptions}
                                                        // image={cat?.image}
                                                        setIsOpen={setIsEditOpen}
                                                        setEditingCategoryId={setEditingCategoryId}
                                                    />
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                                <DialogTrigger>
                                                    <div className="border p-3 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer">
                                                        <DeleteIcon size={15} /> Delete
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className={"md:min-w-lg w-full"}>
                                                    <ConfirmationModal
                                                        title="Delete this Category"
                                                        description={`${cat?.name}`}
                                                        url={`api/categories/${cat?.id}/`}
                                                        method="DELETE"
                                                        onSuccess={() => {
                                                            queryClient.invalidateQueries({ queryKey: [queryKeys.getAllCategories] });
                                                            setIsOpen(false)
                                                        }}
                                                        successMessage="Category successfully deleted."
                                                        body={{}}
                                                    />
                                                </DialogContent>
                                            </Dialog>

                                        </div>
                                    }
                                </div>
                            ))
                            : "Empty Category List!"
                }
            </div>
        </div>
    )
}

export default AllCategories