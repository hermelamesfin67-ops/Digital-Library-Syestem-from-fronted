import * as Yup from "yup";

export const createAuthorSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed().required("Book cover is required"),
});

export type CreateAuthorSchemaType = Yup.InferType<typeof createAuthorSchema>;
