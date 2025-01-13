const { Sequelize } = require("sequelize");
const Category = require("../models/Category");
const Task = require("../models/Task");

class TaskRepository {
  async findAllTasksByUserId(userId) {
    return await Task.findAll({
      where: {
        userId,
      },
    });
  }

  async findTaskById(id, userId) {
    return await Task.findOne({
      where: { id, userId },
      include: {
        model: Category,
        as: "category",
      },
    });
  }

  async findTaskByCategoryId(id, categoryId) {
    return await Task.findAll({
      where: { id, categoryId },
      include: {
        model: Category,
        as: "category",
      },
    });
  }

  async findTaskStatus() {
    const tasksStats = await Task.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
      ],
      group: ["status"],
    });

    return tasksStats.map((taskStats) => ({
      status: taskStats.status,
      count: parseInt(taskStats.getDataValue("count"), 10),
    }));
  }

  async findRecentTasks() {
    return await Task.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      attributes: ["title", "status", "createdAt"],
    });
  }

  async createTask(taskData) {
    return await Task.create(taskData);
  }

  async updateTask(task, updatedData) {
    return await task.update(updatedData);
  }

  async deleteTask(task) {
    return await task.destroy();
  }
}

module.exports = new TaskRepository();
