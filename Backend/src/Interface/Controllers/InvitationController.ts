import { InvitationServices } from "../../core/Services/InvitationServices";
import { Request, Response } from "express";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";
import { Invitation } from "../../core/Entities/Invitation";
import { InvitationStatusEnum } from "../../Shared/Enum/Enums";
import { TaskServices } from "../../core/Services/TaskServices";
import { CategoryServices } from "../../core/Services/CategoryServices";

export class InvitationController {
  constructor(
    private invitationServices: InvitationServices,
    private taskServices: TaskServices,
    private categoryServices: CategoryServices
  ) {}

  async createInvitation(req: Request, res: Response) {
    try {
      const newInvitation = req.body;
      const createdInvitation = await this.invitationServices.createInvitation(
        newInvitation
      );
      const taskResponse = await this.taskServices.getTaskById(
        newInvitation.TaskId
      );

      if (!taskResponse) {
        sendResponse(res, "error", 404, "Task not found", null);
        return;
      }

      const { Id, CategoryId, ...taskWithoutId } = taskResponse;

      let category = await this.categoryServices.getCategoryById(CategoryId);

      const newCategory: any = {
        Name: category?.Name,
        AssignedTo: newInvitation.ReceiverId,
        DeletionDate: null,
        ModifiedDate: new Date().toISOString(),
        CreationDate: new Date().toISOString(),
      };

      let newCategoryCreated = await this.categoryServices.createCategory(
        newCategory
      );

      const newTask: any = {
        ...taskWithoutId,
        AssignedTo: newInvitation.ReceiverId,
        CategoryId: newCategoryCreated.Id,
      };

      const createdTask = await this.taskServices.createTask(newTask);

      sendResponse(
        res,
        "success",
        201,
        "Invitation and Task created successfully",
        {
          invitation: createdInvitation,
          task: createdTask,
        }
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getInvitationById(req: Request, res: Response) {
    try {
      const invitationId = parseInt(req.params.id);
      const invitation = await this.invitationServices.getInvitationById(
        invitationId
      );
      sendResponse(
        res,
        "success",
        200,
        "Invitation retrieved successfully",
        invitation
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getAllInvitations(req: Request, res: Response) {
    try {
      const invitations = await this.invitationServices.getAllInvitations();
      sendResponse(
        res,
        "success",
        200,
        "Invitations retrieved successfully",
        invitations
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async updateInvitation(req: Request, res: Response) {
    try {
      const invitationId = parseInt(req.params.id);
      const { SenderId, ReceiverId, TaskId, Status } = req.body;

      const updatedInvitation = new Invitation(
        invitationId,
        SenderId,
        ReceiverId,
        TaskId,
        Status as InvitationStatusEnum,
        null,
        new Date().toISOString(),
        null
      );

      const invitation = await this.invitationServices.updateInvitation(
        updatedInvitation
      );
      sendResponse(
        res,
        "success",
        200,
        "Invitation updated successfully",
        invitation
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async deleteInvitation(req: Request, res: Response) {
    try {
      const invitationId = parseInt(req.params.id);
      await this.invitationServices.deleteInvitation(invitationId);
      sendResponse(
        res,
        "success",
        200,
        "Invitation deleted successfully",
        null
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }
}
