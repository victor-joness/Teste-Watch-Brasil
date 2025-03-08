import { Router } from "express";
import { CommentServices } from "../../core/Services/CommentServices";
import { CommentRepository } from "../../core/Repositories/CommentRepository";
import { CommentController } from "../Controllers/CommentController";
import { verifyToken } from "../Middlewares/AuthMiddleware";

const router = Router();

const commentRepository = new CommentRepository();
const commentServices = new CommentServices(commentRepository);
const commentController = new CommentController(commentServices);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para gerenciar comentários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - Content
 *         - AuthorId
 *         - TaskId
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID do comentário
 *           example: 1
 *         Content:
 *           type: string
 *           description: Conteúdo do comentário
 *           example: "Comentário sobre a tarefa"
 *         AuthorId:
 *           type: integer
 *           description: ID do autor do comentário
 *           example: 5
 *         TaskId:
 *           type: integer
 *           description: ID da tarefa associada ao comentário
 *           example: 101
 *         DeletionDate:
 *           type: string
 *           description: Data de exclusão do comentário (se aplicável)
 *           example: "2024-03-07T00:00:00Z"
 *         ModifiedDate:
 *           type: string
 *           description: Data de modificação do comentário
 *           example: "2024-03-07T00:00:00Z"
 *         CreationDate:
 *           type: string
 *           description: Data de criação do comentário
 *           example: "2024-03-07T00:00:00Z"
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Retorna a lista de todos os comentários
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Lista de comentários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/", verifyToken, (req, res) => commentController.getAllComments(req, res));

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Retorna um comentário pelo ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentário a ser buscado
 *     responses:
 *       200:
 *         description: Comentário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comentário não encontrado
 */
router.get("/:id", verifyToken, (req, res) => commentController.getCommentById(req, res));

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post("/", verifyToken, (req, res) => commentController.createComment(req, res));

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Atualiza um comentário pelo ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Comentário não encontrado
 */
router.put("/:id", verifyToken, (req, res) => commentController.updateComment(req, res));

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Deleta um comentário pelo ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentário a ser deletado
 *     responses:
 *       200:
 *         description: Comentário deletado com sucesso
 *       404:
 *         description: Comentário não encontrado
 */
router.delete("/:id", verifyToken, (req, res) => commentController.deleteComment(req, res));

export default router;
