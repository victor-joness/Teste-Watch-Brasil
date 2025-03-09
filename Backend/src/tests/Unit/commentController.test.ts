import { CommentController } from "../../Interface/Controllers/CommentController";
import { Comment } from "../../core/Entities/Comment";
import { ICommentRepository } from "../../core/Repositories/IRepositores/ICommentRepository";
import { CommentServices } from "../../core/Services/CommentServices";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Request, Response } from "express";

jest.mock("../../core/Services/CommentServices.ts");

describe("CommentController", () => {
  let commentController: CommentController;
  let commentServiceMock: jest.Mocked<CommentServices>;

  beforeEach(() => {
    const commentRepositoryMock = {} as jest.Mocked<ICommentRepository>;
    commentServiceMock = new CommentServices(
      commentRepositoryMock
    ) as jest.Mocked<CommentServices>;
    commentController = new CommentController(commentServiceMock);
  });

  test("deve retornar todos os comentários", async () => {
    const comments = [
      new Comment(
        1,
        "Comentário 1",
        101,
        201,
        null,
        null,
        new Date().toISOString()
      ),
      new Comment(
        2,
        "Comentário 2",
        102,
        202,
        null,
        null,
        new Date().toISOString()
      ),
    ];

    commentServiceMock.getAllComments = jest.fn().mockResolvedValue(comments);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await commentController.getAllComments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Comments retrieved successfully",
      data: comments,
    });
  });
});
