const { findRecentTasks } = require("../repositories/taskRepository");
const TaskService = require("../services/taskService");

module.exports = {
  async findAllTasks(req, res) {
    try {
      const tasks = await TaskService.findAllTasks(req.user.id);
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findTaskById(req, res) {
    try {
      const task = await TaskService.findTaskById(req.params.id, req.user.id);
      return res.status(200).json(task);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findTaskByCategoryId(req, res) {
    try {
      const tasks = await TaskService.findTaskByCategoryId(
        req.user.id,
        req.params.categoryId
      );
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findTaskStatus(req, res) {
    try {
      const taskStatus = await TaskService.findTaskStatus();
      return res.status(200).json(taskStatus);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async findRecentTasks(req, res) {
    try {
      const recentTask = await TaskService.findRecentTasks();
      return res.status(200).json(recentTask);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async downloadTaskReport(req, res) {
    try {
      const buffer = await TaskService.downloadTasksReport();

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=tasks-report.xlsx"
      );
      return res.end(buffer);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  async postTask(req, res) {
    try {
      // Extrai os dados do corpo da requisição
      const {
        title,
        description,
        status,
        startDate,
        endDate,
        completedAt,
        priority,
        categoryId,
      } = req.body;

      // Certifique-se de que o req.user.id está disponível, fornecido pelo middleware de autenticação
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ error: "Unauthorized: User not authenticated" });
      }

      // Cria a nova tarefa através do serviço
      const newTask = await TaskService.createTask({
        title,
        description,
        status,
        startDate,
        endDate,
        completedAt,
        priority,
        userId: req.user.id, // Pega o id do usuário autenticado
        categoryId,
      });

      // Retorna a resposta de sucesso com status 201
      return res.status(201).json(newTask);
    } catch (error) {
      // Se for um erro de validação, retorna 400
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ error: error.errors.map((e) => e.message) });
      }

      // Tratamento genérico de erro para outros casos
      return res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  },

  async putTask(req, res) {
    try {
      const {
        title,
        description,
        status,
        startDate,
        endDate,
        completedAt,
        priority,
      } = req.body;

      const updatedTask = await TaskService.updateTask(
        req.params.id,
        req.user.id,
        {
          title,
          description,
          status,
          startDate,
          endDate,
          completedAt,
          priority,
        }
      );

      return res.status(200).json(updatedTask);
    } catch (error) {
      if (error.message === "Task not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      const result = await TaskService.deleteTask(req.params.id, req.user.id);
      return res.status(200).json(result);
    } catch (error) {
      if (error.message === "Task not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  },
};
