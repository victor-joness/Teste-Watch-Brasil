import { Router } from "express";
import { UserServices } from "../../core/Services/UserServices";
import { UserRepository } from "../../core/Repositories/UserRepository";
import { UserController } from "../Controllers/UserController";
import { verifyToken } from "../Middlewares/AuthMiddleware";
const router = Router();

const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const userController = new UserController(userServices);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciar usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *         - Email
 *         - Password
 *         - Role
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID do usuário
 *           example: 1
 *         Name:
 *           type: string
 *           description: Nome do usuário
 *           example: "João Silva"
 *         Email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "joao@email.com"
 *         Password:
 *           type: string
 *           description: Senha do usuário (armazenada de forma segura)
 *           example: "hashedpassword123"
 *         Role:
 *           type: enum
 *           description: Papel do usuário no sistema - 0 (USER) 1 (ADMIN)
 *           example: 0
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", verifyToken, (req, res) => userController.getUserById(req, res));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", verifyToken, (req, res) => userController.getAllUsers(req, res));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post("/", verifyToken, (req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", verifyToken, (req, res) => userController.deleteUser(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", verifyToken, (req, res) => userController.updateUser(req, res));

export default router;
