import * as Yup from "yup";

export const createBookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
  total_copies: Yup.string().required("Total copies is required"),
  available_copies: Yup.string()
    .required("Available copies is required")
    .test(
      "available-lte-total",
      "Available copies must be less than or equal to total copies",
      function (value) {
        const total_copies = this.parent.total_copies;
        if (!value || !total_copies) return true;
        return Number(value) <= Number(total_copies);
      },
    ),
  image: Yup.mixed().required("Book cover is required"),
});

export const editBookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  category: Yup.string().required("Category is required"),
  total_copies: Yup.string().required("Total copies is required"),
  available_copies: Yup.string()
    .required("Available copies is required")
    .test(
      "available-lte-total",
      "Available copies must be less than or equal to total copies",
      function (value) {
        const total_copies = this.parent.total_copies;
        if (!value || !total_copies) return true;
        return Number(value) <= Number(total_copies);
      },
    ),
  image: Yup.mixed().optional(),
});

export type CreateBookSchemaType = Yup.InferType<typeof createBookSchema>;
