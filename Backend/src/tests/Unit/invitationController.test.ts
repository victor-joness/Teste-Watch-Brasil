import { InvitationController } from "../../Interface/Controllers/InvitationController";
import { InvitationStatusEnum } from "../../Shared/Enum/Enums";
import { Invitation } from "../../core/Entities/Invitation";
import { IInvitationRepository } from "../../core/Repositories/IRepositores/IInvitationRepository";
import { InvitationServices } from "../../core/Services/InvitationServices";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Request, Response } from "express";

jest.mock("../../core/Services/InvitationServices.ts");

describe("InvitationController", () => {
  let invitationController: InvitationController;
  let invitationServiceMock: jest.Mocked<InvitationServices>;

  beforeEach(() => {
    const invitationRepositoryMock = {} as jest.Mocked<IInvitationRepository>;
    invitationServiceMock = new InvitationServices(
      invitationRepositoryMock
    ) as jest.Mocked<InvitationServices>;
    invitationController = new InvitationController(
      invitationServiceMock,
      {} as any,
      {} as any
    );
  });

  test("deve retornar todas as convites", async () => {
    const invitations = [
      new Invitation(
        1,
        101,
        201,
        301,
        InvitationStatusEnum.ACCEPTED,
        null,
        new Date().toISOString(),
        null
      ),
      new Invitation(
        2,
        102,
        202,
        302,
        InvitationStatusEnum.PENDING,
        null,
        new Date().toISOString(),
        null
      ),
    ];

    invitationServiceMock.getAllInvitations = jest
      .fn()
      .mockResolvedValue(invitations);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await invitationController.getAllInvitations(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Invitations retrieved successfully",
      data: invitations,
    });
  });
});
