import { InvitationStatusEnum } from "../../Shared/Enum/Enums";
import { BaseEntity } from "./BaseEntity";

export class Invitation extends BaseEntity {
  public SenderId: number;
  public ReceiverId: number;
  public TaskId: number;
  public Status: InvitationStatusEnum;

  constructor(
    Id: number,
    SenderId: number,
    ReceiverId: number,
    TaskId: number,
    Status: InvitationStatusEnum,
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    super(Id, DeletionDate ?? null, ModifiedDate ?? null, CreationDate ?? null);
    this.SenderId = SenderId;
    this.ReceiverId = ReceiverId;
    this.TaskId = TaskId;
    this.Status = Status;
  }
}
