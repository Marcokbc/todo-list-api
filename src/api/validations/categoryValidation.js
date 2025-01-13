const yup = require("yup");

const categoryPostSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "The Name must have at least 3 characters")
    .max(30, "The name cannot exceed 30 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "The description must have at least 10 characters"),
});

const categoryPutSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "The Name must have at least 3 characters")
    .max(30, "The name cannot exceed 30 characters"),
  description: yup
    .string()
    .min(10, "The description must have at least 10 characters"),
});

module.exports = { categoryPostSchema, categoryPutSchema };
