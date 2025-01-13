const express = require("express");
const authController = require("../controller/authController");
const validate = require("../middlewares/validateMiddleware");
const { userPostSchema } = require("../validations/userValidation");
const loginSchema = require("../validations/loginValidation");
const { verifyRefreshToken } = require("../middlewares/authMiddleware");

const routes = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       description: Dados do novo usuário para registro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos fornecidos.
 */
routes.post("/register", validate(userPostSchema), authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz o login de um usuário
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       description: Credenciais de login do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação.
 *       400:
 *         description: Credenciais inválidas.
 */
routes.post("/login", validate(loginSchema), authController.login);

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Faz o refresh de um token
 *     tags: 
 *       - Authentication
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenInput'
 *     responses:
 *       200:
 *         description: novo token gerado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *                   description: Token JWT para autenticação.
 *       400:
 *         description: Credenciais inválidas.
 */
routes.post("/refresh", verifyRefreshToken, authController.refreshToken);

module.exports = routes;
