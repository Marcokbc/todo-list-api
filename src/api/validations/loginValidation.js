const yup = require("yup");

const loginSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username or Email is required"),
  password: yup.string().required("Password is required"),
});

module.exports = loginSchema;
