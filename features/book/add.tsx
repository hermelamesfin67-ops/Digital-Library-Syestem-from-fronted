"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Formik, Form } from "formik"

const authors = [
    { label: "Abebe", value: "1" },
    { label: "Kebede", value: "2" },
]
const category = [
    { label: "History", value: "1" },
    { label: "Comedy", value: "2" },
]
function AddBook() {
    return (
        <Formik
            initialValues={{
                title: "",
                author: "",
                category: "",
                total_copies: "",
                available_copies: "",
                image: null
            }}
            onSubmit={() => { }}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="flex flex-col gap-3 p-5">
                        <p>Add Book Form</p>
                        <Input
                            name="title"
                            value={values.title}
                            placeholder="Book Title"
                        />
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
                        <Select items={category}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {category?.map((item) => (
                                        <SelectItem key={item.value} onClick={() => setFieldValue("category", item.value)} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input
                            name="total_copies"
                            type="number"
                            value={values.total_copies}
                            onChange={(e) => setFieldValue("total_copies", e.target.value)}
                            placeholder="Total Copies"
                        />
                        <Input
                            name="available_copies"
                            type="number"
                            max={values.total_copies}
                            onChange={(e) => setFieldValue("available_copies", e.target.value)}
                            value={values.available_copies}
                            placeholder="Available Copies"
                        />
                        <Input
                            name="image"
                            type="file"
                            onChange={(e) => setFieldValue("image", e.currentTarget.files?.[0] || null)}
                            placeholder="Book Cover"
                        />
                    </Form>
                )
            }}


        </Formik>
    )
}

export default AddBook