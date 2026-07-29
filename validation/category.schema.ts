import * as Yup from "yup";

export const createCategorySchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
  image: Yup.mixed().required("Cover image is required"),
});

export type CreateCategorySchemaType = Yup.InferType<
  typeof createCategorySchema
>;
