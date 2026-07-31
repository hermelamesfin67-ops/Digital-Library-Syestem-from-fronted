"use client"
import { queryKeys } from "@/api/query-keys"
import useDynamicMutation from "@/api/use-post-data"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { hasObjectsDifferentValues } from "@/utils"
import { createAuthorSchema, CreateAuthorSchemaType, updateAuthorSchema } from "@/validation/author.schame"
import { useQueryClient } from "@tanstack/react-query"
import { Formik, Form, ErrorMessage } from "formik"
import { toast } from "sonner"
import ImagePreview from "../shared/image"

type Payload = {
    id?: string | number
    name?: string
    biography?: string
    book_count?: number
    image?: File
}
type Props = {
    id?: string | number
    name?: string
    biography?: string
    book_count?: number
    image?: string
    setIsOpen: (arg: boolean) => void
    setEditingAuthorId: (arg: number | null) => void
}

function AddAuthor({ id, name, biography, book_count, image, setIsOpen, setEditingAuthorId }: Props) {
    const queryClient = useQueryClient()
    const postMutation = useDynamicMutation({ type: "FormData" })


    const initialValues = {
        name: name ?? "",
        biography: biography ?? "",
        book_count: book_count ?? "" as unknown as number,
        image: "" as unknown as File
    }

    const bookHandler = async (values: CreateAuthorSchemaType) => {
        const payload: Payload = {
            name: values.name,
            biography: values.biography,
            book_count: values.book_count || 0
        }
        if (values.image) payload["image"] = values.image as unknown as File
        try {
            await postMutation.mutateAsync({
                url: id ? `api/books/${id}/` : "api/authors/",
                method: id ? "PUT" : "POST",
                body: payload,
                onSuccess: () => {
                    toast.success(id ? "Author Updated Successfully" : "Author Added Successfully")
                    queryClient.invalidateQueries({ queryKey: [queryKeys.getAllAuthors] })
                    setIsOpen(false)
                    setEditingAuthorId(null)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={id ? updateAuthorSchema : createAuthorSchema}
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
                        <p className="text-lg font-semibold">{id ? "Update" : "Add"} Author Form</p>
                        <div>
                            <p className="mb-1">
                                Author Name
                            </p>
                            <Input
                                name="name"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                                placeholder="Author Name"
                            />
                            <ErrorMessage
                                name={"name"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>
                        <div>
                            <p className="mb-1">
                                Author Biography
                            </p>
                            <Input
                                name="biography"
                                value={values.biography}
                                onChange={(e) => setFieldValue("biography", e.target.value)}
                                placeholder="Author Biography"
                            />
                            <ErrorMessage
                                name={"biography"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>
                        <div>
                            <p className="mb-1">
                                Book Count
                            </p>
                            <Input
                                name="book_count"
                                value={values.book_count}
                                onChange={(e) => setFieldValue("book_count", e.target.value)}
                                placeholder="Books Count"
                            />
                        </div>
                        <div>
                            <p className="mb-1">
                                Author Avatar
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

export default AddAuthor