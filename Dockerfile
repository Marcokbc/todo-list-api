FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${APPLICATION_PORT}

# Comando para iniciar a aplicação
CMD ["sh", "-c", "npx sequelize db:migrate && npm run start"]
