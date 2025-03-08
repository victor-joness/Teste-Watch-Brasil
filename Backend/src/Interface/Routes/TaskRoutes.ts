import { Router } from "express";
import { TaskRepository } from "../../core/Repositories/TaskRepository";
import { TaskServices } from "../../core/Services/TaskServices";
import { TaskController } from "../Controllers/TaskController";
import { verifyToken } from "../Middlewares/AuthMiddleware";

const router = Router();

const taskRepository = new TaskRepository();
const taskServices = new TaskServices(taskRepository);
const taskController = new TaskController(taskServices);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         Id:
 *           type: integer
 *           example: 1
 *         Title:
 *           type: string
 *           example: "Implementar autenticação"
 *         Description:
 *           type: string
 *           example: "Implementar autenticação JWT para login de usuário."
 *         Status:
 *           type: string
 *           enum: [Pendente, EmProgresso, Concluída]
 *           example: "EmProgresso"
 *         Priority:
 *           type: string
 *           enum: [Baixa, Média, Alta]
 *           example: "Alta"
 *         CategoryId:
 *           type: integer
 *           example: 2
 *         AssignedTo:
 *           type: integer
 *           example: 5
 *         DueDate:
 *           type: string
 *           format: date
 *           example: "2024-09-30"
 *         Progress:
 *           type: number
 *           example: 50
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarefa recuperada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/:id", verifyToken, (req, res) => taskController.getTaskById(req, res));

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas recuperada com sucesso
 */
router.get("/", verifyToken, (req, res) => taskController.getAllTasks(req, res));

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 */
router.post("/", verifyToken, (req, res) => taskController.createTask(req, res));

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 */
router.put("/:id", verifyToken, (req, res) => taskController.updateTask(req, res));

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 */
router.delete("/:id", verifyToken, (req, res) => taskController.deleteTask(req, res));

/**
 * @swagger
 * /api/tasks/user/{id}:
 *   get:
 *     summary: Retorna as tarefas pelo id do usuario
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarefa recuperada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.get("/user/:id", verifyToken, (req, res) => taskController.getTaskByUserId(req, res));

export default router;
