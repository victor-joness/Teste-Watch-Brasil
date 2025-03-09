import { CategoryController } from "../../Interface/Controllers/CategoryController";
import { Category } from "../../core/Entities/Category";
import { CategoryServices } from "../../core/Services/CategoryServices";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { Request, Response } from "express";

jest.mock("../../core/Services/CategoryServices.ts");

describe("CategoryController", () => {
  let categoryController: CategoryController;
  let categoryServiceMock: jest.Mocked<CategoryServices>;

  beforeEach(() => {
    categoryServiceMock = new CategoryServices(
      {} as any
    ) as jest.Mocked<CategoryServices>;
    categoryController = new CategoryController(categoryServiceMock);
  });

  test("deve retornar todas as categorias", async () => {
    const categories = [
      new Category(1, "Categoria 1", 1),
      new Category(2, "Categoria 2", 2),
    ];

    categoryServiceMock.getAllCategorys = jest
      .fn()
      .mockResolvedValue(categories);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await categoryController.getAllCategories(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Categories retrieved successfully",
      data: categories,
    });
  });
});
