import { BaseEntity } from "./BaseEntity";

export class Comment extends BaseEntity {
  public Content: string;
  public AuthorId: number;
  public TaskId: number;

  constructor(
    Id: number,
    Content: string,
    AuthorId: number,
    TaskId: number,
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    super(Id, DeletionDate ?? null, ModifiedDate ?? null, CreationDate ?? null);
    this.Content = Content;
    this.AuthorId = AuthorId;
    this.TaskId = TaskId;
  }
}
