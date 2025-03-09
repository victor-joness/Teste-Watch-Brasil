import { Task } from "../../core/Entities/Task";

export class TaskMapper {
  public static fromTaskToDB(task: Task): Task {
    return task;
  }

  public static fromDBtoTask(task: any): Task {
    return new Task(
      task.Id,
      task.Title,
      task.Description,
      task.Status,
      task.Priority,
      task.CategoryId,
      task.AssignedTo,
      task.DueDate,
      task.Progress,
      task.TaskOrigin,
      task.DeletionDate,
      task.ModifiedDate,
      task.CreationDate
    );
  }
}
