import { invitationsTable } from "../../Infrastructure/database/schemas/invitationsTable";
import { InvitationMapper } from "../../Shared/Mappers/InvitationMapper";
import { Invitation } from "../Entities/Invitation";
import { BaseRepository } from "./BaseRepository";
import { IInvitationRepository } from "./IRepositores/IInvitationRepository";

export class InvitationRepository
  extends BaseRepository<Invitation>
  implements IInvitationRepository
{
  constructor() {
    super(invitationsTable, {
      fromEntityToDB: InvitationMapper.fromInvitationToDB,
      fromDBToEntity: InvitationMapper.fromDBtoInvitation,
    });

    this.table = invitationsTable;
    this.mapper = {
      fromEntityToDB: InvitationMapper.fromInvitationToDB,
      fromDBToEntity: InvitationMapper.fromDBtoInvitation,
    };
  }
}