import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { UserServices } from "../../core/Services/UserServices";
import { UserRepository } from "../../core/Repositories/UserRepository";

const router = Router();
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const authController = new AuthController(userServices);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autenticação e autorização de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Name
 *               - Email
 *               - Password
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: "João Silva"
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: "joao@email.com"
 *               Password:
 *                 type: string
 *                 description: Senha do usuário (será hashada no backend)
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       409:
 *         description: Email já cadastrado
 */
//@ts-ignore
router.post("/register", (req, res) => authController.register(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login de um usuário e retorna um JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *                 example: "joao@email.com"
 *               Password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido com o token JWT retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado para autenticação
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Dados inválidos fornecidos
 *       401:
 *         description: Credenciais inválidas
 */
//@ts-ignore
router.post("/login", (req, res) => authController.login(req, res));

export default router;
