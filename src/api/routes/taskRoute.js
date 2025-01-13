const express = require("express");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const taskController = require("../controller/taskController");
const validate = require("../middlewares/validateMiddleware");
const {
  taskPostSchema,
  taskPutSchema,
} = require("../validations/taskValidation");

const routes = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Lista de todas as tarefas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado.
 */
routes.get("/tasks", isAuthenticated, taskController.findAllTasks);

/**
 * @swagger
 * /task/findById/{id}:
 *   get:
 *     summary: Retorna uma tarefa por ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Tarefa não encontrada.
 */
routes.get("/task/findById/:id", isAuthenticated, taskController.findTaskById);

/**
 * @swagger
 * /task/findByCategoryId/{categoryId}:
 *   get:
 *     summary: Retorna todas as tarefas de uma category especifica
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da category
 *     responses:
 *       200:
 *         description: Lista de tarefas do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Usuário não encontrado ou sem tarefas.
 */
routes.get(
  "/task/findByCategoryId/:categoryId",
  isAuthenticated,
  taskController.findTaskByCategoryId
);

/**
 * @swagger
 * /tasks/recent:
 *   get:
 *     summary: Retorna as tarefas mais recentes
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Tarefas recentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado.
 */
routes.get("/tasks/recent", isAuthenticated, taskController.findRecentTasks);

/**
 * @swagger
 * /tasks/status:
 *   get:
 *     summary: Retorna o status das tarefas
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Status das tarefas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTasks:
 *                   type: integer
 *                 completedTasks:
 *                   type: integer
 *       401:
 *         description: Não autenticado.
 */
routes.get("/tasks/status", isAuthenticated, taskController.findTaskStatus);

/**
 * @swagger
 * /tasks/excel:
 *   get:
 *     summary: Baixar relatório de tarefas em Excel
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
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
 */
routes.get("/tasks/excel", isAuthenticated, taskController.downloadTaskReport);

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Cria uma nova tarefa
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     requestBody:
 *       description: Dados da nova tarefa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado.
 */
routes.post("/task", isAuthenticated, taskController.postTask);

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       description: Dados atualizados da tarefa
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Tarefa não encontrada.
 */
routes.put(
  "/task/:id",
  isAuthenticated,
  validate(taskPutSchema),
  taskController.putTask
);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Deleta uma tarefa existente
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso.
 *       401:
 *         description: Não autenticado.
 *       404:
 *         description: Tarefa não encontrada.
 */
routes.delete("/task/:id", isAuthenticated, taskController.deleteTask);

module.exports = routes;
