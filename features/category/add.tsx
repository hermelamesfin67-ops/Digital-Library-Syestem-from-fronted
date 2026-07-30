"use client"
import { queryKeys } from "@/api/query-keys"
import useDynamicMutation from "@/api/use-post-data"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { createCategorySchema, CreateCategorySchemaType } from "@/validation/category.schema"
import { Formik, Form, ErrorMessage } from "formik"

function AddCategory({ setIsOpen }: { setIsOpen: (arg: boolean) => void }) {
    const postMutation = useDynamicMutation({ type: "FormData" })

    const bookHandler = async (values: CreateCategorySchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: queryKeys.getAllCategories,
                method: "POST",
                body: {
                    name: values.name
                },
                onSuccess: () => {
                    setIsOpen(false)
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Formik
            initialValues={{
                name: "",
                image: "" as unknown as File
            }}
            validationSchema={createCategorySchema}
            onSubmit={(val) => bookHandler(val)}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="flex flex-col gap-3 p-5">
                        <p>Add Category Form</p>
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
                                name={"title"}
                                component="div"
                                className={"text-xs text-red-500 pt-1 font-medium"}
                            />
                        </div>

                        <div>
                            <p className="mb-1">
                                Cover Image
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