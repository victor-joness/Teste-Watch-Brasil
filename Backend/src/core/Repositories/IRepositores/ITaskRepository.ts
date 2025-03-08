import { Task } from "../../Entities/Task";
import { IBaseRepository } from "./IBaseRepository";

export interface ITaskRepository extends IBaseRepository<Task> {
    getTaskByUserId(userId: number): Promise<Task[]>
}