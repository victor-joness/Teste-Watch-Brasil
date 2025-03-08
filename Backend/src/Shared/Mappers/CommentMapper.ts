import { Comment } from "../../core/Entities/Comment";

export class CommentMapper {
  public static fromCommentToDB(comment: Comment): Comment {
    return comment;
  }

  public static fromDBtoComment(comment: any): Comment {
    return new Comment(
      comment.Id,
      comment.Content,
      comment.AuthorId,
      comment.TaskId,
      comment.DeletionDate,
      comment.ModifiedDate,
      comment.CreationDate
    );
  }
}
