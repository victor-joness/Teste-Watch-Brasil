import { TaskController } from "../../Interface/Controllers/TaskController";
import { TaskPriorityEnum, TaskStatusEnum } from "../../Shared/Enum/Enums";
import { Task } from "../../core/Entities/Task";
import { ITaskRepository } from "../../core/Repositories/IRepositores/ITaskRepository";
import { TaskServices } from "../../core/Services/TaskServices";
import { beforeEach, describe, expect, test } from "@jest/globals";

jest.mock("../../core/Services/TaskServices.ts");

describe("TaskController", () => {
  let taskController: TaskController;
  let taskServiceMock: jest.Mocked<TaskServices>;

  beforeEach(() => {
    const taskRepositoryMock = {} as jest.Mocked<ITaskRepository>;
    taskServiceMock = new TaskServices(taskRepositoryMock) as jest.Mocked<TaskServices>;
    taskController = new TaskController(taskServiceMock);
  });

  test("deve retornar todas as tarefas", async () => {
    const tasks = [
      new Task(
        1,
        "Task Title",
        "Task Description",
        TaskStatusEnum.COMPLETED,
        TaskPriorityEnum.AVERAGE,
        0,
        1,
        new Date().toISOString(),
        20,
        0
      ),
    ];
  
    taskServiceMock.getAllTasks = jest.fn().mockResolvedValue(tasks);
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    const req = {
      get: jest.fn(),
      header: jest.fn(),
      accepts: jest.fn(),
      acceptsCharsets: jest.fn(),
    } as any;
  
    await taskController.getAllTasks(req, res as any);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Tasks retrieved successfully",
      data: tasks,
    });    
  });
});