const express = require("express");
const userController = require("../controller/userController");
const {
  isAuthenticated,
  isAuthorized,
} = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {
  userPostSchema,
  userPutSchema,
} = require("../validations/userValidation");

const routes = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de todos os usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado.
 */
routes.get("/users", isAuthenticated, userController.findUsers);

/**
 * @swagger
 * /users/findById/{id}:
 *   get:
 *     summary: Retorna um usuário por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Usuário não encontrado.
 */

routes.get("/users/findById/:id", isAuthenticated, userController.findUserById);

/**
 * @swagger
 * /users/findByName/{name}:
 *   get:
 *     summary: Retorna um usuário por nome
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Usuário não encontrado.
 */
routes.get(
  "/users/findByName/:name",
  isAuthenticated,
  userController.findUserByName
);

/**
 * @swagger
 * /users/stats:
 *   get:
 *     summary: Retorna estatísticas dos usuários
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Estatísticas dos usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 activeUsers:
 *                   type: integer
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.get(
  "/users/stats/",
  [isAuthenticated, isAuthorized(["admin"])],
  userController.findUserStats
);

/**
 * @swagger
 * /users/recent:
 *   get:
 *     summary: Retorna os usuários mais recentes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Usuários recentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.get(
  "/users/recent/",
  [isAuthenticated, isAuthorized(["admin"])],
  userController.findRecentUsers
);

/**
 * @swagger
 * /users/growth:
 *   get:
 *     summary: Retorna o crescimento de usuários ao longo do tempo
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Crescimento de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 growthRate:
 *                   type: number
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.get(
  "/users/growth/",
  [isAuthenticated, isAuthorized(["admin"])],
  userController.findUsersGrowth
);

/**
 * @swagger
 * /users/excel:
 *   get:
 *     summary: Baixar relatório de usuários em Excel
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Relatório Excel baixado com sucesso.
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.get(
  "/users/excel/",
  [isAuthenticated, isAuthorized(["admin"])],
  userController.downloadUsersReport
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       description: Dados do novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.post(
  "/users",
  [isAuthenticated, isAuthorized(["admin"])],
  validate(userPostSchema),
  userController.postUsers
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       description: Dados atualizados do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Usuário não encontrado.
 */

routes.put(
  "/users/:id",
  isAuthenticated,
  validate(userPutSchema),
  userController.putUsers
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso.
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.delete(
  "/users/:id",
  [isAuthenticated, isAuthorized(["admin"])],
  userController.deleteUsers
);

module.exports = routes;
