import { ITaskRepository } from "../Repositories/IRepositores/ITaskRepository";
import { Task } from "../Entities/Task";

export class TaskServices {
    constructor(private taskRepository: ITaskRepository) {}

    async createTask(taskData: Task): Promise<Task> {
        return await this.taskRepository.create(taskData);
    }

    async getTaskById(taskId: number): Promise<Task | null> {
        return await this.taskRepository.getById(taskId);
    }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.getAll();
    }

    async updateTask(taskData: Task): Promise<Task | null> {
        return await this.taskRepository.update(taskData);
    }

    async deleteTask(taskId: number): Promise<boolean> {
        return await this.taskRepository.delete(taskId);
    }

    async getTaskByUserId(userId: number):Promise<Task[]> {
        return await this.taskRepository.getTaskByUserId(userId);
    }
}
