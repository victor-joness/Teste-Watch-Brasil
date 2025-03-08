import { Router } from "express";
import UserRoutes from "./UserRoutes";
import ReportRoutes from "./ReportRoutes";
import TaskRoutes from "./TaskRoutes";
import InvitationRoutes from "./InvitationRoutes";
import CommentRoutes from "./CommentRoutes";
import CategoryRoutes from "./CategoryRoutes";
import AuthRoutes from "./AuthRoutes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/reports", ReportRoutes);
router.use("/tasks", TaskRoutes);
router.use("/invitations", InvitationRoutes);
router.use("/comments", CommentRoutes);
router.use("/categories", CategoryRoutes);

export default router;