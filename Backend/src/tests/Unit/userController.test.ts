import { UserController } from "../../Interface/Controllers/UserController";
import { User } from "../../core/Entities/User";
import { RoleEnum } from "../../Shared/Enum/Enums";
import { IUserRepository } from "../../core/Repositories/IRepositores/IUserRepository";
import { UserServices } from "../../core/Services/UserServices";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Request, Response } from "express";

jest.mock("../../core/Services/UserServices.ts");

describe("UserController", () => {
  let userController: UserController;
  let userServiceMock: jest.Mocked<UserServices>;

  beforeEach(() => {
    const userRepositoryMock = {} as jest.Mocked<IUserRepository>;
    userServiceMock = new UserServices(
      userRepositoryMock
    ) as jest.Mocked<UserServices>;
    userController = new UserController(userServiceMock);
  });

  test("deve retornar todos os usuários", async () => {
    const users = [
      new User(
        1,
        "John Doe",
        "john@example.com",
        "",
        RoleEnum.USER,
        new Date().toISOString()
      ),
      new User(
        2,
        "Jane Doe",
        "jane@example.com",
        "",
        RoleEnum.ADMIN,
        new Date().toISOString()
      ),
    ];

    userServiceMock.getAllUsers = jest.fn().mockResolvedValue(users);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await userController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Users retrieved successfully",
      data: users,
    });
  });
});
