"use client"
import useDynamicMutation from "@/api/use-post-data"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createCategorySchema, CreateCategorySchemaType } from "@/validation/category.schema"
import { Formik, Form, ErrorMessage } from "formik"

type Props = {
    id?: string
    name?: string
    description?: string
    image?: string
    setIsOpen: (arg: boolean) => void
    setEditingCategoryId: (arg: number | null) => void
}
function AddCategory({ id, name, description, setIsOpen, setEditingCategoryId }: Props) {
    const postMutation = useDynamicMutation({ type: "FormData" })

    const bookHandler = async (values: CreateCategorySchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: id ? `api/categories/${id}` : `api/categories/`,
                method: id ? "PUT" : "POST",
                body: {
                    name: values.name
                },
                onSuccess: () => {
                    setIsOpen(false)
                    setEditingCategoryId(null)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Formik
            initialValues={{
                name: name ?? "",
                description: description ?? "",
                image: "" as unknown as File
            }}
            validationSchema={createCategorySchema}
            onSubmit={(val) => bookHandler(val)}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="flex flex-col gap-3 p-5">
                        <p className="text-lg font-semibold">{id ? "Update" : "Add"} Category Form</p>
                        <div>
                            <p className="mb-1">
                                Category Name
                            </p>
                            <Input
                                name="name"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                                placeholder="Category Name"
                            />
                            <ErrorMessage
                                name={"name"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>
                        <div>
                            <p className="mb-1">
                                Category Description
                            </p>
                            <Textarea
                                name="description"
                                value={values.description}
                                onChange={(e) => setFieldValue("description", e.target.value)}
                                placeholder="Category Description"
                                className="min-h-24"
                            />
                            <ErrorMessage
                                name={"description"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>

                        <div>
                            <p className="mb-1">
                                Cover Icon
                            </p>
                            <Input
                                name="image"
                                type="file"
                                onChange={(e) => setFieldValue("image", e.currentTarget.files?.[0] || null)}
                                placeholder="Category Icon"
                            />
                            <ErrorMessage
                                name={"image"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <DialogClose className={"border rounded-md"}>
                                <button type="button" className="w-full h-full">
                                    Cancel
                                </button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={postMutation.isPending}
                                variant={"primary"}
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

export default AddCategory