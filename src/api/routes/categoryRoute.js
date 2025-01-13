const express = require("express");
const categoryController = require("../controller/categoryController");
const {
  isAuthenticated,
  isAuthorized,
} = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {
  categoryPostSchema,
  categoryPutSchema,
} = require("../validations/categoryValidation");

const routes = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas as categorias.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       401:
 *         description: Não autenticado.
 */
routes.get(
  "/categories",
  isAuthenticated,
  categoryController.findAllCategories
);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada.
 *       401:
 *         description: Não autenticado.
 */
routes.get(
  "/category/:id",
  isAuthenticated,
  categoryController.findCategoryById
);

/**
 * @swagger
 * /category/{name}/findByName:
 *   get:
 *     summary: Retorna categorias pelo nome
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         description: Nome da categoria
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categorias encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categorias não encontradas.
 *       401:
 *         description: Não autenticado.
 */
routes.get(
  "/category/:name/findByName",
  isAuthenticated,
  categoryController.findCategoriesByName
);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criação de uma nova categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 */
routes.post(
  "/category",
  [isAuthenticated, isAuthorized(["admin"])],
  validate(categoryPostSchema),
  categoryController.createCategory
);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados atualizados da categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 *       404:
 *         description: Categoria não encontrada.
 */
routes.put(
  "/category/:id",
  [isAuthenticated, isAuthorized(["admin"])],
  validate(categoryPutSchema),
  categoryController.updateCategory
);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Deleta uma categoria existente
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria a ser deletada
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso.
 *       401:
 *         description: Não autenticado.
 *       403:
 *         description: Não autorizado.
 *       404:
 *         description: Categoria não encontrada.
 */
routes.delete(
  "/category/:id",
  [isAuthenticated, isAuthorized(["admin"])],
  categoryController.deleteCategory
);

module.exports = routes;
