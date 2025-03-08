import { Invitation } from "../../core/Entities/Invitation";

export class InvitationMapper {
  public static fromInvitationToDB(invitation: Invitation): Invitation {
    return invitation;
  }

  public static fromDBtoInvitation(invitation: any): Invitation {
    return new Invitation(
      invitation.Id,
      invitation.SenderId,
      invitation.ReceiverId,
      invitation.TaskId,
      invitation.Status,
      invitation.DeletionDate,
      invitation.ModifiedDate,
      invitation.CreationDate
    );
  }
}
