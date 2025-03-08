import { UserServices } from "../../core/Services/UserServices";
import { Request, Response } from "express";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";
import { User } from "../../core/Entities/User";
import { RoleEnum } from "../../Shared/Enum/Enums";

export class UserController {
    constructor(private userServices: UserServices) {}

    async createUser(req: Request, res: Response) {
        try {
            const { Name, Email } = req.body;
            const newUser = new User(0, Name, Email, "", RoleEnum.USER, new Date().toISOString());
            const createdUser = await this.userServices.createUser(newUser);
            sendResponse(res, "success", 201, "User created successfully", createdUser);
        } catch (error: any) {
            sendResponse(res, "error", error.statusCode || 500, error.message, null);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const user = await this.userServices.getUserById(userId);
            sendResponse(res, "success", 200, "User retrieved successfully", user);
        } catch (error: any) {
            sendResponse(res, "error", error.statusCode || 500, error.message, null);
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userServices.getAllUsers();
            sendResponse(res, "success", 200, "Users retrieved successfully", users);
        } catch (error: any) {
            sendResponse(res, "error", error.statusCode || 500, error.message, null);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const updateUser: User = req.body;
            const result = await this.userServices.updateUser(updateUser);
            sendResponse(res, "success", 200, "User updated successfully", result);
        } catch (error: any) {
            sendResponse(res, "error", error.statusCode || 500, error.message, null);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            await this.userServices.deleteUser(userId);
            sendResponse(res, "success", 200, "User deleted successfully", null);
        } catch (error: any) {
            sendResponse(res, "error", error.statusCode || 500, error.message, null);
        }
    }
}