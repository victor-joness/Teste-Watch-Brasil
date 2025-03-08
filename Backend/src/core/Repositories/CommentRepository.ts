import { commentsTable } from "../../Infrastructure/database/schemas/commentsTable";
import { CommentMapper } from "../../Shared/Mappers/CommentMapper";
import { Comment } from "../Entities/Comment";
import { BaseRepository } from "./BaseRepository";
import { ICommentRepository } from "./IRepositores/ICommentRepository";

export class CommentRepository
  extends BaseRepository<Comment>
  implements ICommentRepository
{
  constructor() {
    super(commentsTable, {
      fromEntityToDB: CommentMapper.fromCommentToDB,
      fromDBToEntity: CommentMapper.fromDBtoComment,
    });

    this.table = commentsTable;
    this.mapper = {
      fromEntityToDB: CommentMapper.fromCommentToDB,
      fromDBToEntity: CommentMapper.fromDBtoComment,
    };
  }
}