const app = require("./server");
require("dotenv").config();

const connection = require("./api/database/database");
const User = require("./api/models/User");
const Task = require("./api/models/Task");
const Category = require("./api/models/Category");

connection
  .sync()
  .then(() => {
    console.log("Database connected successfully.");

    User.init(connection);
    Category.init(connection);
    Task.init(connection);

    User.associate({ Task });
    Task.associate({ Category, User });
    Category.associate({ Task });

    const PORT = process.env.APPLICATION_PORT;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${process.env.URL}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
