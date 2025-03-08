import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { UserController } from "../../Interface/Controllers/UserController";
import { UserServices } from "../../core/Services/UserServices";
import { Request, Response } from "express";
import { User } from "../../core/Entities/User";
import { RoleEnum } from "../../Shared/Enum/Enums";
import { IUserRepository } from "../../core/Repositories/IRepositores/IUserRepository";

jest.mock("../../core/Services/UserServices");
jest.mock("../../Shared/Utils/ResponseTemplate");

describe("UserController", () => {
  let userController: UserController;
  let userServicesMock: jest.Mocked<UserServices>;

  beforeEach(() => {
    const userRepositoryMock = {} as jest.Mocked<IUserRepository>;
    userServicesMock = new UserServices(
      userRepositoryMock
    ) as jest.Mocked<UserServices>;
    userController = new UserController(userServicesMock);
  });

  test("deve criar um novo usuário com sucesso", async () => {
    const req = {
      body: { Name: "John Doe", Email: "john@example.com" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const newUser = new User(
      0,
      "John Doe",
      "john@example.com",
      "",
      RoleEnum.USER,
      new Date().toISOString()
    );

    userServicesMock.createUser.mockResolvedValue(newUser);

    await userController.createUser(req, res);

    expect(userServicesMock.createUser).toHaveBeenCalledWith(newUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 201,
      message: "User created successfully",
      data: newUser,
    });
  });

  test("deve retornar um usuário por ID com sucesso", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const user = new User(
      1,
      "John Doe",
      "john@example.com",
      "",
      RoleEnum.USER,
      new Date().toISOString()
    );

    userServicesMock.getUserById.mockResolvedValue(user);

    await userController.getUserById(req, res);

    expect(userServicesMock.getUserById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      message: "User retrieved successfully",
      data: user,
    });
  });

  test("deve retornar todos os usuários com sucesso", async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const users = [
      new User(
        1,
        "John Doe",
        "john@example.com",
        "",
        RoleEnum.USER,
        new Date().toISOString()
      ),
    ];

    userServicesMock.getAllUsers.mockResolvedValue(users);

    await userController.getAllUsers(req, res);

    expect(userServicesMock.getAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  });

  test("deve atualizar um usuário com sucesso", async () => {
    const req = {
      params: { id: "1" },
      body: { id: 1, Name: "John Updated", Email: "johnupdated@example.com" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const updatedUser = new User(
      1,
      "John Updated",
      "johnupdated@example.com",
      "",
      RoleEnum.USER,
      new Date().toISOString()
    );

    userServicesMock.updateUser.mockResolvedValue(updatedUser);

    await userController.updateUser(req, res);

    expect(userServicesMock.updateUser).toHaveBeenCalledWith(updatedUser);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  });

  test("deve deletar um usuário com sucesso", async () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    userServicesMock.deleteUser.mockResolvedValue(true);

    await userController.deleteUser(req, res);

    expect(userServicesMock.deleteUser).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      code: 200,
      message: "User deleted successfully",
      data: null,
    });
  });

  test("deve retornar erro ao tentar criar um usuário", async () => {
    const req = {
      body: { Name: "Invalid User", Email: "" },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const error = new Error("Validation Error");
    userServicesMock.createUser.mockRejectedValue(error);

    await userController.createUser(req, res);

    expect(userServicesMock.createUser).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      code: 500,
      message: "Validation Error",
      data: null,
    });
  });
});
