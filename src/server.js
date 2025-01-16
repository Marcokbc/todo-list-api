const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const swaggerInline = require("swagger-inline");
const logger = console; // Substitua por um logger real, se necessário
require("dotenv").config();
const swaggerFilePath = path.dirname(__dirname) + "/swaggerFile.json";
const swaggerJsDoc = require("swagger-jsdoc");

const taskRoutes = require("./api/routes/taskRoute");
const categoryRoutes = require("./api/routes/categoryRoute");

const app = express();

app.use(express.json());

// Gerar documentação Swagger com `swagger-inline`
swaggerInline(["./src/**/*.js"], {
  base: "./swaggerBase.yaml",
  format: ".json",
})
  .then((generatedSwagger) => {
    logger.info("> Gerando documentação Swagger...");

    // Salvar a documentação no arquivo JSON
    if (fs.existsSync(path.dirname(__dirname) + "/swaggerFile.json")) {
      fs.unlink(path.dirname(__dirname) + "/swaggerFile.json", () => {
        fs.appendFile("./swaggerFile.json", generatedSwagger, function (err2) {
          if (err2) throw err2;
          else logger.info("> swagger docs generated!");
        });
      });
    } else {
      fs.appendFile(
        path.dirname(__dirname) + "/swaggerFile.json",
        generatedSwagger,
        function (err) {
          if (err) throw err;
          else logger.info("swagger docs generated!!");
        }
      );
    }

    if (fs.existsSync(swaggerFilePath)) {
      const swaggerDefinition = JSON.parse(generatedSwagger); // Parse no JSON gerado
      const options = {
        definition: swaggerDefinition,
        apis: [path.resolve(__dirname, "api/routes/*.js")], // Caminho das rotas
      };

      const swaggerSpec = swaggerJsDoc(options);
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    } else {
      logger.warn(
        "Documentação Swagger não foi gerada. Verifique erros anteriores."
      );
    }
  })
  .catch((err) => {
    logger.error("Erro ao gerar documentação Swagger:", err);
  });

// Rotas
app.use(taskRoutes);
app.use(categoryRoutes);

module.exports = app;
