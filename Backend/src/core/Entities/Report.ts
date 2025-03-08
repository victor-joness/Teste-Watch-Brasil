import { BaseEntity } from "./BaseEntity";

export class Report extends BaseEntity {
  public Title: string;
  public Content: string;
  public AuthorId: number;
  public TaskIds: number[];

  constructor(
    Id: number,
    Title: string,
    Content: string,
    AuthorId: number,
    TaskIds: number[],
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    super(Id, DeletionDate ?? null, ModifiedDate ?? null, CreationDate ?? null);
    this.Title = Title;
    this.Content = Content;
    this.AuthorId = AuthorId;
    this.TaskIds = TaskIds;
  }
}
