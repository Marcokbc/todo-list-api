const yup = require("yup");

const userPostSchema = yup.object().shape({
  name: yup
    .string()
    .required("The name is required")
    .min(3, "The name must have at least 3 characters"),
  email: yup.string().email("Invalid email").required("The e-mail is required"),
  username: yup
    .string()
    .required("The username is required")
    .min(3, "The username must have at least 3 characters"),
  password: yup
    .string()
    .required("The password is required")
    .min(6, "The password must be at least 6 characters long")
    .matches(/[a-zA-Z]/, "The password must contain at least one letter")
    .matches(/\d/, "The password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "The password must contain at least one special character"
    ),
  phoneNumber: yup
    .string()
    .matches(
      /^\(\d{2}\) \d{1} \d{4}-\d{4}$/,
      "The phone must follow the format (XX)X XXXX-XXXX"
    ),
  birthDate: yup.date().required("The birth date is required"),
  sex: yup.string().oneOf(["M", "F"], "Invalid sex").required(),
  active: yup.boolean().required("The active is required"),
  role: yup
    .string()
    .oneOf(["admin", "basic"], "Invalid status")
    .default("basic"),
});

const userPutSchema = yup.object().shape({
  name: yup.string().min(3, "The name must have at least 3 characters"),
  email: yup.string().email("Invalid email"),
  password: yup
    .string()
    .min(6, "The password must be at least 6 characters long")
    .matches(/[a-zA-Z]/, "The password must contain at least one letter")
    .matches(/\d/, "The password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "The password must contain at least one special character"
    ),
  phoneNumber: yup
    .string()
    .matches(
      /^\(\d{2}\) \d{1} \d{4}-\d{4}$/,
      "The phone must follow the format (XX)X XXXX-XXXX"
    ),
  birthDate: yup.date(),
  sex: yup.string().oneOf(["M", "F"], "Invalid sex"),
  active: yup.boolean(),
  role: yup
    .string()
    .oneOf(["admin", "basic"], "Invalid status")
    .default("basic"),
});

module.exports = { userPostSchema, userPutSchema };
