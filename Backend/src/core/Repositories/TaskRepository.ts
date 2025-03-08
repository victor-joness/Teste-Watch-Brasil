import { sql } from "drizzle-orm";
import { tasksTable } from "../../Infrastructure/database/schemas/tasksTable";
import { TaskMapper } from "../../Shared/Mappers/TaskMapper";
import { Task } from "../Entities/Task";
import { BaseRepository } from "./BaseRepository";
import { ITaskRepository } from "./IRepositores/ITaskRepository";
import { db } from "../../Infrastructure/database/db";

export class TaskRepository
  extends BaseRepository<Task>
  implements ITaskRepository
{
  constructor() {
    super(tasksTable, {
      fromEntityToDB: TaskMapper.fromTaskToDB,
      fromDBToEntity: TaskMapper.fromDBtoTask,
    });

    this.table = tasksTable;
    this.mapper = {
      fromEntityToDB: TaskMapper.fromTaskToDB,
      fromDBToEntity: TaskMapper.fromDBtoTask,
    };
  }
  async getTaskByUserId(userId: number): Promise<Task[]> {
    try {
          const result = await db
            .select()
            .from(this.table)
            .where(sql`assigned_to = ${userId} AND deletion_date IS NULL`);
    
          return result.map((row: any) => this.mapper.fromDBToEntity(row));
        } catch (error) {
          throw new Error("Falha ao buscar tasks");
        }
  }
}
