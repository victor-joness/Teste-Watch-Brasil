import { Router } from "express";
import { ReportServices } from "../../core/Services/ReportServices";
import { ReportRepository } from "../../core/Repositories/ReportRepository";
import { ReportController } from "../Controllers/ReportController";
import { verifyToken } from "../Middlewares/AuthMiddleware";

const router = Router();

const reportRepository = new ReportRepository();
const reportServices = new ReportServices(reportRepository);
const reportController = new ReportController(reportServices);

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Endpoints para gerenciar relatórios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - Title
 *         - Content
 *         - AuthorId
 *         - TaskIds
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID do relatório
 *           example: 1
 *         Title:
 *           type: string
 *           description: Título do relatório
 *           example: "Análise de desempenho"
 *         Content:
 *           type: string
 *           description: Conteúdo do relatório
 *           example: "Este relatório analisa o desempenho das tarefas concluídas..."
 *         AuthorId:
 *           type: integer
 *           description: ID do autor do relatório
 *           example: 10
 *         TaskIds:
 *           type: array
 *           items:
 *             type: integer
 *           description: Lista de IDs das tarefas relacionadas ao relatório
 *           example: [101, 102, 103]
 */

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Retorna a lista de todos os relatórios
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Lista de relatórios retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 */
router.get("/", verifyToken, (req, res) => reportController.getAllReports(req, res));

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Retorna um relatório pelo ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do relatório a ser buscado
 *     responses:
 *       200:
 *         description: Relatório encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Relatório não encontrado
 */
router.get("/:id", verifyToken, (req, res) => reportController.getReportById(req, res));

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Cria um novo relatório
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       201:
 *         description: Relatório criado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post("/", verifyToken, (req, res) => reportController.createReport(req, res));

/**
 * @swagger
 * /api/reports/{id}:
 *   put:
 *     summary: Atualiza um relatório pelo ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do relatório a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Relatório atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Relatório não encontrado
 */
router.put("/:id", verifyToken, (req, res) => reportController.updateReport(req, res));

/**
 * @swagger
 * /api/reports/{id}:
 *   delete:
 *     summary: Deleta um relatório pelo ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do relatório a ser deletado
 *     responses:
 *       200:
 *         description: Relatório deletado com sucesso
 *       404:
 *         description: Relatório não encontrado
 */
router.delete("/:id", verifyToken, (req, res) => reportController.deleteReport(req, res));

export default router;
