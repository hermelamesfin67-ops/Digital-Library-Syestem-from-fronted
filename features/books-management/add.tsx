"use client"
import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"
import useDynamicMutation from "@/api/use-post-data"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { hasObjectsDifferentValues } from "@/utils"
import { createBookSchema, CreateBookSchemaType, editBookSchema } from "@/validation/book.schema"
import { useQueryClient } from "@tanstack/react-query"
import { Formik, Form, ErrorMessage } from "formik"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import ImagePreview from "../shared/image"

type PayloadType = {
    title: string,
    author_name: string,
    category_name?: string,
    total_copies: string,
    available_copies: string,
    image?: File
}
type Props = {
    id?: number,
    title?: string,
    author?: string,
    category?: string,
    total_copies?: string,
    available_copies?: string,
    image?: string
    setIsOpen: (arg: boolean) => void
    setEditingBookId: (arg: number | null) => void
}
function AddBook({ id, title, author, category, available_copies, total_copies, image, setIsOpen, setEditingBookId }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "FormData" })

    const authorData = useFetchData(
        [queryKeys.getAllAuthors],
        "api/authors/"
    )
    const authorsList: Authors[] = authorData.data
    const authors = authorsList ? authorsList?.map((a) => ({
        label: a?.name,
        value: a?.id
    })) : []
    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        "api/categories/"
    )
    const categoryList: Categories[] = categoryData.data
    const categories = categoryList ? categoryList?.map((a) => ({
        label: a?.name,
        value: a?.id
    })) : []


    const initialValues = {
        title: title ?? "",
        author: author ?? "",
        category: category ?? "",
        total_copies: total_copies ?? "",
        available_copies: available_copies ?? "",
        image: "" as unknown as File
    }

    const bookHandler = async (values: CreateBookSchemaType) => {
        console.log(values.category)
        const payload: PayloadType = {
            title: values.title,
            author_name: values.author,
            category_name: values.category,
            total_copies: values.total_copies,
            available_copies: values.available_copies,

        }
        if (values.image) {
            payload["image"] = values.image as unknown as File
        }
        try {
            await postMutation.mutateAsync({
                url: id ? `api/books/${id}/` : "api/books/",
                method: id ? "PATCH" : "POST",
                body: payload,
                onSuccess: () => {
                    toast.success(id ? "Book Updated Successfully" : "Book Added Successfully")
                    queryClient.invalidateQueries({ queryKey: [queryKeys.getAllBooks] })
                    setIsOpen(false)
                    setEditingBookId(null)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (authorData.isFetching || categoryData.isFetching) return <Loader2 className="animate-spin" />
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={id ? editBookSchema : createBookSchema}
            onSubmit={(val) => {
                if (!val.image && !hasObjectsDifferentValues(val, initialValues)) {
                    toast.warning("No changes applied!");
                    return;
                }
                bookHandler(val)
            }}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="flex flex-col gap-3 p-5">
                        <p className="text-lg font-semibold">{id ? "Update" : "Add"} Book Form</p>
                        <div>
                            <p className="mb-1">
                                Title
                            </p>
                            <Input
                                name="title"
                                value={values.title}
                                onChange={(e) => setFieldValue("title", e.target.value)}
                                placeholder="Book Title"
                            />
                            <ErrorMessage
                                name={"title"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>
                        <div>
                            <p className="mb-1">
                                Author
                            </p>
                            <Select items={authors} value={values.author}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Author" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {authors?.map((item) => (
                                            <SelectItem key={item.value} onClick={() => setFieldValue("author", item.value)} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <ErrorMessage
                                name={"author"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>
                        <div>
                            <p className="mb-1">
                                Category
                            </p>
                            <Select items={categories} value={values.category}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories?.map((item) => (
                                            <SelectItem key={item.value} onClick={() => setFieldValue("category", item.value)} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <ErrorMessage
                                name={"category"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="mb-1">
                                    Total Copies
                                </p>
                                <Input
                                    name="total_copies"
                                    type="number"
                                    value={values.total_copies}
                                    onChange={(e) => setFieldValue("total_copies", e.target.value)}
                                    placeholder="Total Copies"
                                />
                                <ErrorMessage
                                    name={"total_copies"}
                                    component="div"
                                    className={"text-xs text-red-500 pt-1 font-medium"}
                                />
                            </div>
                            <div>
                                <p className="mb-1">
                                    Available Copies
                                </p>
                                <Input
                                    name="available_copies"
                                    type="number"
                                    onChange={(e) => setFieldValue("available_copies", e.target.value)}
                                    value={values.available_copies}
                                    placeholder="Available Copies"
                                />
                                <ErrorMessage
                                    name={"available_copies"}
                                    component="div"
                                    className={"text-xs text-red-500 pt-1 font-medium"}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="mb-1">
                                Book Cover
                            </p>
                            <Input
                                name="image"
                                type="file"
                                onChange={(e) => setFieldValue("image", e.currentTarget.files?.[0] || null)}
                                placeholder="Book Cover"
                            />
                            {!values.image && image ?
                                <ImagePreview
                                    width={100}
                                    height={100}
                                    src={image} alt="book cover" className="w-12 h-12"
                                />
                                : null}
                            <ErrorMessage
                                name={"image"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <DialogClose className={"border rounded-md"}>
                                <Button variant={"secondary"} className="w-full h-full cursor-pointer">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant={"primary"}
                                disabled={postMutation.isPending}
                            >
                                {postMutation.isPending ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </Form>
                )
            }}


        </Formik>
    )
}

export default AddBook