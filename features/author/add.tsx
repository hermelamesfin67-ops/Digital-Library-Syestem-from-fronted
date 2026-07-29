"use client"
import { queryKeys } from "@/api/query-keys"
import { useFetchData } from "@/api/use-fetch-data"
import useDynamicMutation from "@/api/use-post-data"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBookSchema, CreateBookSchemaType } from "@/validation/book.schema"
import { Formik, Form, ErrorMessage } from "formik"
import { Loader2 } from "lucide-react"

function AddAuthor({ setIsOpen }: { setIsOpen: (arg: boolean) => void }) {
    const postMutation = useDynamicMutation({ type: "FormData" })

    const authorData = useFetchData(
        [queryKeys.getAllAuthors],
        queryKeys.getAllAuthors
    )
    const authorsList: Authors[] = authorData.data
    const authors = authorsList ? authorsList?.map((a) => ({
        label: a?.name,
        value: a?.id
    })) : []
    const categoryData = useFetchData(
        [queryKeys.getAllCategories],
        queryKeys.getAllCategories
    )
    const categoryList: Categories[] = categoryData.data
    const categories = categoryList ? categoryList?.map((a) => ({
        label: a?.name,
        value: a?.id
    })) : []

    const bookHandler = async (values: CreateBookSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: queryKeys.getAllBooks,
                method: "POST",
                body: {
                    title: values.title,
                    author_name: values.author,
                    category_name: values.category,
                    total_copies: values.total_copies,
                    available_copies: values.available_copies,
                    image: values.image
                },
                onSuccess: () => {
                    setIsOpen(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (authorData.isFetching || categoryData.isFetching) return <Loader2 className="animate-spin" />
    return (
        <Formik
            initialValues={{
                title: "",
                author: "",
                category: "",
                total_copies: "",
                available_copies: "",
                image: "" as unknown as File
            }}
            validationSchema={createBookSchema}
            onSubmit={(val) => bookHandler(val)}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="flex flex-col gap-3 p-5">
                        <p>Add Book Form</p>
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
                            <Select items={authors}>
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
                            <Select items={categories}>
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
                            <ErrorMessage
                                name={"image"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <DialogClose className={"border rounded-md"}>
                                <div className="w-full h-full">
                                    Cancel
                                </div>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={postMutation.isPending}
                                className={"bg-gradient"}>
                                {postMutation.isPending ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </Form>
                )
            }}


        </Formik>
    )
}

export default AddAuthor