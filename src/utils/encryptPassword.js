const bcrypt = require("bcryptjs");
const saltRounds = 10;

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { encryptPassword, comparePassword };
