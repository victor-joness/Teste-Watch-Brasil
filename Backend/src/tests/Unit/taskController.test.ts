import { TaskController } from "../../Interface/Controllers/TaskController";
import { TaskPriorityEnum, TaskStatusEnum } from "../../Shared/Enum/Enums";
import { Task } from "../../core/Entities/Task";
import { ITaskRepository } from "../../core/Repositories/IRepositores/ITaskRepository";
import { TaskServices } from "../../core/Services/TaskServices";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("../services/taskService");

describe("TaskController", () => {
  let taskController: TaskController;
  let taskServiceMock: jest.Mocked<TaskServices>;

  beforeEach(() => {
    const taskRepositoryMock = {} as jest.Mocked<ITaskRepository>;
    taskServiceMock = new TaskServices(
      taskRepositoryMock
    ) as jest.Mocked<TaskServices>;
    taskController = new TaskController(taskServiceMock);
  });

  test("deve retornar todas as tarefas", async () => {
    const tasks = [
      new Task(
        1, // Id
        "Task Title", // Title
        "Task Description", // Description
        TaskStatusEnum.COMPLETED, // CreatedAt
        TaskPriorityEnum.AVERAGE, // UpdatedAt
        0, // Status
        1, // UserId
        new Date().toISOString(), // DueDate
        20 // CompletedAt
      ),
    ];
    taskServiceMock.getAllTasks.mockResolvedValue(tasks);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const req = {};

    await taskController.getTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: tasks });
  });
});
