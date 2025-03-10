import { TaskServices } from "../../core/Services/TaskServices";
import { Request, Response } from "express";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";
import { Task } from "../../core/Entities/Task";
import { TaskStatusEnum } from "../../Shared/Enum/Enums";

export class TaskController {
  constructor(private taskServices: TaskServices) {}

  async createTask(req: Request, res: Response) {
    try {
      const newTask: Task = req.body;

      const createdTask = await this.taskServices.createTask(newTask);
      sendResponse(
        res,
        "success",
        201,
        "Task created successfully",
        createdTask
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const task = await this.taskServices.getTaskById(taskId);
      sendResponse(res, "success", 200, "Task retrieved successfully", task);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskServices.getAllTasks();
      sendResponse(res, "success", 200, "Tasks retrieved successfully", tasks);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      const updatedTask = req.body;
      console.log(updatedTask);

      const task = await this.taskServices.updateTask(updatedTask);

      const taskById = await this.taskServices.getTaskById(taskId);
      console.log(taskById);

      if (taskById && updatedTask.Status === "Concluída" && taskById.TaskOrigin !== null) {
        const taskOriginId = taskById.TaskOrigin;

        const taskOrigin = await this.taskServices.getTaskById(taskOriginId);

        if (taskOrigin) {
          await this.taskServices.updateTask({
            ...taskOrigin,
            Status: TaskStatusEnum.COMPLETED,
            Progress: 100,
            TaskOrigin: null,
          });
        }

        const dependentTasks = await this.taskServices.getTaskByUserId(taskOriginId);

        for (const dependentTask of dependentTasks) {
          await this.taskServices.updateTask({
            ...dependentTask,
            Status: TaskStatusEnum.COMPLETED,
            Progress: 100,
            TaskOrigin: null
          });
        }
      }

      const allTasks = await this.taskServices.getAllTasks();

      const dependentTasks = allTasks.filter(
        (task) => task.TaskOrigin === taskId
      );

      for (const dependentTask of dependentTasks) {
        await this.taskServices.updateTask({
          ...dependentTask,
          Status: TaskStatusEnum.COMPLETED,
          Progress: 100,
          TaskOrigin: null,
        });
      }

      sendResponse(res, "success", 200, "Task updated successfully", task);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = parseInt(req.params.id);
      await this.taskServices.deleteTask(taskId);
      sendResponse(res, "success", 200, "Task deleted successfully", null);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getTaskByUserId(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const tasks = await this.taskServices.getTaskByUserId(userId);
      sendResponse(res, "success", 200, "Tasks retrieved successfully", tasks);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }
}
