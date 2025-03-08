import { BaseEntity } from "./BaseEntity";

export class Category extends BaseEntity {
  public Name: string;
  public AssignedTo: number;

  constructor(
    Id: number,
    Name: string,
    AssignedTo: number,
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    super(Id, DeletionDate ?? null, ModifiedDate ?? null, CreationDate ?? null);
    this.Name = Name;
    this.AssignedTo = AssignedTo;
  }
}
