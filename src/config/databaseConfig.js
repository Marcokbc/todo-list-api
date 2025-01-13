require("dotenv").config({ path: __dirname + "/../../.env" });
require("dotenv").config();

module.exports = {
  dialect: process.env.DIALECT,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
};
