const { sendMessageToQueue } = require("../../utils/rabbitMQ");
const readExcel = require("../../utils/readExcel");
const taskRepository = require("../repositories/taskRepository");
const TaskRepository = require("../repositories/taskRepository");
// const redis = require("redis");
// const client = redis.createClient({
//   socket: {
//     host: "redis",
//     port: 6379,
//   },
// });
// client.connect();

class TaskService {
  async findAllTasks(userId) {
    // await client.set("testando", "gostoasas peitudas");

    const tasks = await TaskRepository.findAllTasksByUserId(userId);
    if (!tasks || tasks.length === 0) {
      throw new Error("No tasks found for the user");
    }

    // return await client.get("testando");
  }

  async findTaskById(id, userId) {
    const task = await TaskRepository.findTaskById(id, userId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  async findTaskByCategoryId(user, categoryId) {
    const tasks = await TaskRepository.findTaskByCategoryId(user, categoryId);
    if (!tasks || tasks.length === 0) {
      throw new Error("Tasks not found");
    }
    return tasks;
  }

  async findTaskStatus() {
    const taskStatus = await TaskRepository.findTaskStatus();

    if (!taskStatus || taskStatus.length === 0) {
      throw new Error("Status of tasks not found");
    }
    return taskStatus;
  }

  async findRecentTasks() {
    const recentTasks = await TaskRepository.findRecentTasks();

    if (!recentTasks || recentTasks.length === 0) {
      throw new Error("Recent tasks not found");
    }
    return recentTasks;
  }

  async downloadTasksReport() {
    const recentTasks = await taskRepository.findRecentTasks();
    const taskStatus = await taskRepository.findTaskStatus();

    const recentTasksSheet = [];
    const taskStatushSheet = [];

    recentTasks.forEach((recentTask) => {
      recentTasksSheet.push({
        title: recentTask.title,
        status: recentTask.status,
        createdAt: recentTask.createdAt,
      });
    });

    taskStatus.forEach((status) => {
      taskStatushSheet.push({
        status: status.status,
        count: status.count,
      });
    });

    const newBook = readExcel.createNewBook();

    readExcel.appendNewSheetToBook("Tasks Stats", taskStatushSheet, newBook);
    readExcel.appendNewSheetToBook("Recent Tasks", recentTasksSheet, newBook);

    const buffer = await readExcel.writeBook(newBook);

    return buffer;
  }

  async createTask(taskData) {
    return await TaskRepository.createTask(taskData);
  }

  async updateTask(id, userId, updatedData) {
    const task = await TaskRepository.findTaskById(id, userId);
    if (!task) {
      throw new Error("Task not found");
    }

    if (updatedData.status == "completed") {
      const email = {
        to: "mameira55@gmail.com",
        subject: "Teste",
        html: "<h1>Teste</h1>",
        text: "Teste",
      };

      sendMessageToQueue("email_queue", email);
    }

    return await TaskRepository.updateTask(task, updatedData);
  }

  async deleteTask(id, userId) {
    const task = await TaskRepository.findTaskById(id, userId);
    if (!task) {
      throw new Error("Task not found");
    }
    await TaskRepository.deleteTask(task);
    return { message: "Task deleted successfully" };
  }
}

module.exports = new TaskService();
