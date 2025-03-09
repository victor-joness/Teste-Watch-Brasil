import { Request, Response } from "express";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";
import { CommentServices } from "../../core/Services/CommentServices";
import { Comment } from "../../core/Entities/Comment";

export class CommentController {
  constructor(private commentServices: CommentServices) {}

  async createComment(req: Request, res: Response) {
    try {
      const newComment = req.body;

      const createdComment = await this.commentServices.createComment(
        newComment
      );
      sendResponse(
        res,
        "success",
        201,
        "Comment created successfully",
        createdComment
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getCommentById(req: Request, res: Response) {
    try {
      const commentId = parseInt(req.params.id);
      const comment = await this.commentServices.getCommentById(commentId);

      sendResponse(
        res,
        "success",
        200,
        "Comment retrieved successfully",
        comment
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getAllComments(req: Request, res: Response) {
    try {
      const comments = await this.commentServices.getAllComments();
      sendResponse(
        res,
        "success",
        200,
        "Comments retrieved successfully",
        comments
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const commentId = parseInt(req.params.id);
      const updatedComment = req.body;

      const comment = await this.commentServices.updateComment(updatedComment);

      sendResponse(
        res,
        "success",
        200,
        "Comment updated successfully",
        comment
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const commentId = parseInt(req.params.id);
      const deletedComment = await this.commentServices.deleteComment(
        commentId
      );

      sendResponse(res, "success", 200, "Comment deleted successfully", null);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }
}
