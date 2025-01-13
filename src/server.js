const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

const userRoutes = require("./api/routes/userRoute");
const authRoutes = require("./api/routes/authRoute");
const taskRoutes = require("./api/routes/taskRoute");
const uploadRoutes = require("./api/routes/uploadRoute");
const categoryRoutes = require("./api/routes/categoryRoute");
const cors = require("cors");

const app = express();

// const allowedOrigins = ["http://example.com", "http://another-example.com"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Não permitido por CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

// app.use(cors());

app.use(express.json());

var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentação",
    version: "1.0.0",
    description: "Documentação da API",
  },
  servers: [
    {
      url: process.env.URL,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: require("../schemas.json"),
  },
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [__dirname + "/api/routes/*.js"],
};

var swaggerSpec = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRoutes);
app.use(authRoutes);
app.use(taskRoutes);
app.use(categoryRoutes);
app.use(uploadRoutes);

module.exports = app;
