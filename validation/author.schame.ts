import * as Yup from "yup";

export const createAuthorSchema = Yup.object().shape({
  name: Yup.string().required("Author Name is required"),
  biography: Yup.string().required("Biography is required"),
  book_count: Yup.number(),
  image: Yup.mixed().required("Author avatar is required"),
});
export const updateAuthorSchema = Yup.object().shape({
  name: Yup.string().required("Author Name is required"),
  biography: Yup.string().required("Biography is required"),
  book_count: Yup.number(),
  image: Yup.mixed().optional(),
});

export type CreateAuthorSchemaType = Yup.InferType<typeof createAuthorSchema>;
