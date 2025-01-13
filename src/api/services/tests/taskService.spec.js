const taskService = require("../taskService");
const TaskRepository = require("../../repositories/taskRepository");

jest.mock("../../repositories/taskRepository");

describe("Task Service Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should return all tasks", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", userId: 11 },
      { id: 2, title: "Task 2", userId: 11 },
    ];

    TaskRepository.findAllTasksByUserId.mockResolvedValue(mockTasks);

    const result = await taskService.findAllTasks(11);

    expect(TaskRepository.findAllTasksByUserId).toHaveBeenCalledWith(11);
    expect(TaskRepository.findAllTasksByUserId).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTasks);
  });
});
