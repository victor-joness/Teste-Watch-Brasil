import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserServices } from "../../core/Services/UserServices";
import { User } from "../../core/Entities/User";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";
import { HashService } from "../../Shared/Utils/HashService";
import { RoleEnum } from "../../Shared/Enum/Enums";
import { uuid } from "drizzle-orm/gel-core";
import { generateId } from "../../Shared/Utils/GenerateId";

const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";

export class AuthController {
  constructor(private userServices: UserServices) {}

  async register(req: Request, res: Response) {
    try {
      const { Name, Email, Password } = req.body;

      const userExists = await this.userServices.getUserByEmail(Email);
      if (userExists) {
        return sendResponse(res, "error", 409, "Email já cadastrado", null);
      }

      let userRegister = new User(
        generateId(),
        Name,
        Email,
        await new HashService().Hash(Password),
        RoleEnum.USER,
        null,
        null,
        new Date().toISOString()
      );

      const user = await this.userServices.createUser(userRegister);
      return sendResponse(res, "success", 201, "Usuário registrado com sucesso", user);
    } catch (error: any) {
      return sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { Email, Password } = req.body;

      const user = await this.userServices.getUserByEmail(Email);

      if (!user) {
        return sendResponse(res, "error", 401, "Usuário não encontrado", null);
      }

      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return sendResponse(res, "error", 401, "Senha inválida", null);
      }

      const token = jwt.sign({ id: user.Id, email: user.Email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return sendResponse(res, "success", 200, "Login bem-sucedido", { token: token, userId: user.Id});
    } catch (error: any) {
      return sendResponse(res, "error", 500, "Erro ao autenticar", null);
    }
  }
}
