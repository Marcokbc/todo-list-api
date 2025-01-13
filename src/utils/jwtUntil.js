const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "15m" });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });
};

exports.verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new Error("invalid token");
  }
};

exports.verifyRefreshToken = (refreshToken) => {
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    return user;
  });
};
