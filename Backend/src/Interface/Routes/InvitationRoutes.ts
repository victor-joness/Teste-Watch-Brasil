import { Router } from "express";
import { InvitationServices } from "../../core/Services/InvitationServices";
import { InvitationRepository } from "../../core/Repositories/InvitationRepository";
import { InvitationController } from "../Controllers/InvitationController";
import { verifyToken } from "../Middlewares/AuthMiddleware";
import { TaskServices } from "../../core/Services/TaskServices";
import { TaskRepository } from "../../core/Repositories/TaskRepository";
import { CategoryServices } from "../../core/Services/CategoryServices";
import { CategoryRepository } from "../../core/Repositories/CategoryRepository";

const router = Router();

const invitationRepository = new InvitationRepository();
const invitationServices = new InvitationServices(invitationRepository);

const taskRepository = new TaskRepository();
const taskServices = new TaskServices(taskRepository)

const categoryRepository = new CategoryRepository();
const categoryServices = new CategoryServices(categoryRepository);

const invitationController = new InvitationController(invitationServices, taskServices, categoryServices);

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Endpoints para gerenciar convites
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invitation:
 *       type: object
 *       required:
 *         - SenderId
 *         - ReceiverId
 *         - TaskId
 *         - Status
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID do convite
 *           example: 1
 *         SenderId:
 *           type: integer
 *           description: ID do remetente do convite
 *           example: 10
 *         ReceiverId:
 *           type: integer
 *           description: ID do destinatário do convite
 *           example: 20
 *         TaskId:
 *           type: integer
 *           description: ID da tarefa associada ao convite
 *           example: 5
 *         Status:
 *           type: string
 *           description: Status do convite
 *           example: "Pending"
 */

/**
 * @swagger
 * /api/invitations:
 *   get:
 *     summary: Retorna a lista de todos os convites
 *     tags: [Invitations]
 *     responses:
 *       200:
 *         description: Lista de convites retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invitation'
 */
router.get("/", verifyToken, (req, res) => invitationController.getAllInvitations(req, res));

/**
 * @swagger
 * /api/invitations/{id}:
 *   get:
 *     summary: Retorna um convite pelo ID
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do convite a ser buscado
 *     responses:
 *       200:
 *         description: Convite encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invitation'
 *       404:
 *         description: Convite não encontrado
 */
router.get("/:id", verifyToken, (req, res) => invitationController.getInvitationById(req, res));

/**
 * @swagger
 * /api/invitations:
 *   post:
 *     summary: Cria um novo convite
 *     tags: [Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       201:
 *         description: Convite criado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post("/", verifyToken, (req, res) => invitationController.createInvitation(req, res));

/**
 * @swagger
 * /api/invitations/{id}:
 *   put:
 *     summary: Atualiza um convite pelo ID
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do convite a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invitation'
 *     responses:
 *       200:
 *         description: Convite atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Convite não encontrado
 */
router.put("/:id", verifyToken, (req, res) => invitationController.updateInvitation(req, res));

/**
 * @swagger
 * /api/invitations/{id}:
 *   delete:
 *     summary: Deleta um convite pelo ID
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do convite a ser deletado
 *     responses:
 *       200:
 *         description: Convite deletado com sucesso
 *       404:
 *         description: Convite não encontrado
 */
router.delete("/:id", verifyToken, (req, res) => invitationController.deleteInvitation(req, res));

export default router;
