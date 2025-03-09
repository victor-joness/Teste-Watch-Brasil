import { TaskPriorityEnum, TaskStatusEnum } from "../../Shared/Enum/Enums";
import { BaseEntity } from "./BaseEntity";

export class Task extends BaseEntity {
  public Title: string;
  public Description: string;
  public Status: TaskStatusEnum;
  public Priority: TaskPriorityEnum;
  public CategoryId: number;
  public AssignedTo: number;
  public DueDate: string;
  public Progress: number;
  public TaskOrigin: number | null;

  constructor(
    Id: number,
    Title: string,
    Description: string,
    Status: TaskStatusEnum,
    Priority: TaskPriorityEnum,
    CategoryId: number,
    AssignedTo: number,
    DueDate: string,
    Progress: number,
    TaskOrigin: number | null,
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    super(Id, DeletionDate ?? null, ModifiedDate ?? null, CreationDate ?? null);
    this.Title = Title;
    this.Description = Description;
    this.Status = Status;
    this.Priority = Priority;
    this.CategoryId = CategoryId;
    this.AssignedTo = AssignedTo;
    this.DueDate = DueDate;
    this.Progress = Progress;
    this.TaskOrigin = TaskOrigin;
  }
}
