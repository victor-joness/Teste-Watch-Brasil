import { Invitation } from "../Entities/Invitation";
import { IInvitationRepository } from "../Repositories/IRepositores/IInvitationRepository";

export class InvitationServices {
    constructor(private invitationRepository: IInvitationRepository) {}

    async createInvitation(invitationData: Invitation): Promise<Invitation> {
        return await this.invitationRepository.create(invitationData);
    }

    async getInvitationById(invitationId: number): Promise<Invitation | null> {
        return await this.invitationRepository.getById(invitationId);
    }

    async getAllInvitations(): Promise<Invitation[]> {
        return await this.invitationRepository.getAll();
    }

    async updateInvitation(invitationData: Invitation): Promise<Invitation | null> {
        return await this.invitationRepository.update(invitationData);
    }

    async deleteInvitation(invitationId: number): Promise<boolean> {
        return await this.invitationRepository.delete(invitationId);
    }
}