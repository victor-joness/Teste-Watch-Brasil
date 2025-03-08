import { Router } from "express";
import { CategoryServices } from "../../core/Services/CategoryServices";
import { CategoryRepository } from "../../core/Repositories/CategoryRepository";
import { CategoryController } from "../Controllers/CategoryController";
import { verifyToken } from "../Middlewares/AuthMiddleware";

const router = Router();

const categoryRepository = new CategoryRepository();
const categoryServices = new CategoryServices(categoryRepository);
const categoryController = new CategoryController(categoryServices);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para gerenciar categorias
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID da categoria
 *           example: 1
 *         Name:
 *           type: string
 *           description: Nome da categoria
 *           example: "Tecnologia"
 *         AssignedTo:
 *           type: integer
 *           example: 5
 *         DeletionDate:
 *           type: string
 *           description: Data de exclusão da categoria (se aplicável)
 *           example: "2024-03-07T00:00:00Z"
 *         ModifiedDate:
 *           type: string
 *           description: Data de modificação da categoria
 *           example: "2024-03-07T00:00:00Z"
 *         CreationDate:
 *           type: string
 *           description: Data de criação da categoria
 *           example: "2024-03-07T00:00:00Z"
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retorna a lista de todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", verifyToken, (req, res) => categoryController.getAllCategories(req, res));

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria a ser buscada
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/:id", verifyToken, (req, res) => categoryController.getCategoryById(req, res));

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post("/", verifyToken, (req, res) => categoryController.createCategory(req, res));

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Categoria não encontrada
 */
router.put("/:id", verifyToken, (req, res) => categoryController.updateCategory(req, res));

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria a ser deletada
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.delete("/:id", verifyToken, (req, res) => categoryController.deleteCategory(req, res));


/**
 * @swagger
 * /api/categories/user/{id}:
 *   get:
 *     summary: Retorna a lista de todas as categorias com base no ID do usuario.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuario
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/user/:id", verifyToken, (req, res) => categoryController.getCategoryByUserID(req, res));

export default router;
