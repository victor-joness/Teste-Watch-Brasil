import { Request, Response } from "express";
import { sendResponse } from "../../Shared/Utils/ResponseTemplate";
import { CategoryServices } from "../../core/Services/CategoryServices";
import { Category } from "../../core/Entities/Category";

export class CategoryController {
  constructor(private categoryServices: CategoryServices) {}

  async createCategory(req: Request, res: Response) {
    try {
      const newCategory: Category = req.body;

      const createdCategory = await this.categoryServices.createCategory(
        newCategory
      );
      sendResponse(
        res,
        "success",
        201,
        "Category created successfully",
        createdCategory
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params.id);
      const category = await this.categoryServices.getCategoryById(categoryId);

      sendResponse(
        res,
        "success",
        200,
        "Category retrieved successfully",
        category
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await this.categoryServices.getAllCategorys();
      sendResponse(
        res,
        "success",
        200,
        "Categories retrieved successfully",
        categories
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params.id);
      const updatedCategory = req.body;

      const category = await this.categoryServices.updateCategory(
        updatedCategory
      );

      sendResponse(
        res,
        "success",
        200,
        "Category updated successfully",
        category
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params.id);
      const deletedCategory = await this.categoryServices.deleteCategory(
        categoryId
      );

      sendResponse(res, "success", 200, "Category deleted successfully", null);
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }

  async getCategoryByUserID(req: Request, res: Response){
    try {
      const userId = parseInt(req.params.id);
      const categories = await this.categoryServices.getCategoryByUserID(
        userId
      );

      sendResponse(
        res,
        "success",
        200,
        "Categories retrieved successfully",
        categories
      );
    } catch (error: any) {
      sendResponse(res, "error", error.statusCode || 500, error.message, null);
    }
  }
}
