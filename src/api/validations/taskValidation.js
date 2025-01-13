const yup = require("yup");

const taskPostSchema = yup.object().shape({
  title: yup
    .string()
    .required("The title is required")
    .min(3, "The title must have at least 3 characters"),
  description: yup
    .string()
    .min(5, "The description must be at least 5 characters long"),
  status: yup
    .string()
    .oneOf(["pending", "in_progress", "completed"], "Invalid status")
    .default("pending"),
  startDate: yup
    .date()
    .required("Start date is required")
    .max(yup.ref("endDate"), "The start date cannot be after the end date"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "The end date cannot be before the start date"),
  completedAt: yup
    .date()
    .nullable()
    .when("status", {
      is: "completed",
      then: yup
        .date()
        .required("Completion date is required if the task is complete"),
      otherwise: yup.date().nullable(),
    }),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"], "Invalid priority")
    .default("medium"),
  categoryId: yup
    .number()
    .required("Category Id is required")
    .integer("The category ID must be an integer"),
});

const taskPutSchema = yup.object().shape({
  title: yup.string().min(3, "The title must have at least 3 characters"),
  description: yup
    .string()
    .min(5, "The description must be at least 5 characters long"),
  status: yup
    .string()
    .oneOf(["pending", "in_progress", "completed"], "Invalid status")
    .default("pending"),
  startDate: yup
    .date()
    .max(yup.ref("endDate"), "The start date cannot be after the end date"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "The end date cannot be before the start date"),
  completedAt: yup
    .date()
    .nullable()
    .when("status", {
      is: "completed",
      then: yup
        .date()
        .required("Completion date is required if the task is complete"),
      otherwise: yup.date().nullable(),
    }),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"], "Invalid priority")
    .default("medium"),
  userId: yup.number().integer("The user ID must be an integer"),
});

module.exports = { taskPostSchema, taskPutSchema };
