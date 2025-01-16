const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new Error("invalid token");
  }
};
