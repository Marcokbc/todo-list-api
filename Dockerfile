FROM node:alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${APPLICATION_PORT}

CMD ["sh", "-c", "npx sequelize db:migrate && npm run start"]
