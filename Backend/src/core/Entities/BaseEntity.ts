export class BaseEntity {
  constructor(
    public Id: Number | null,
    public DeletionDate: string | null,
    public ModifiedDate: string | null,
    public CreationDate: string | null
  ) {
    this.DeletionDate = DeletionDate;
    this.ModifiedDate = ModifiedDate;
    this.CreationDate = CreationDate;
  }
}
