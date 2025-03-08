import { Comment } from "../Entities/Comment";
import { ICommentRepository } from "../Repositories/IRepositores/ICommentRepository";

export class CommentServices {
    constructor(private commentRepository: ICommentRepository) {}

    async createComment(commentData: Comment): Promise<Comment> {
        return await this.commentRepository.create(commentData);
    }

    async getCommentById(commentId: number): Promise<Comment | null> {
        return await this.commentRepository.getById(commentId);
    }

    async getAllComments(): Promise<Comment[]> {
        return await this.commentRepository.getAll();
    }

    async updateComment(commentData: Comment): Promise<Comment | null> {
        return await this.commentRepository.update(commentData);
    }

    async deleteComment(commentId: number): Promise<boolean> {
        return await this.commentRepository.delete(commentId);
    }
}