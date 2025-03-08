import { Category } from "../Entities/Category";
import { ICategoryRepository } from "../Repositories/IRepositores/ICategoryRepository";

export class CategoryServices {
    constructor(private categoryRepository: ICategoryRepository) {}

    async createCategory(categoryData: Category): Promise<Category> {
        return await this.categoryRepository.create(categoryData);
    }

    async getCategoryById(categoryId: number): Promise<Category | null> {
        return await this.categoryRepository.getById(categoryId);
    }

    async getAllCategorys(): Promise<Category[]> {
        return await this.categoryRepository.getAll();
    }

    async updateCategory(categoryData: Category): Promise<Category | null> {
        return await this.categoryRepository.update(categoryData);
    }

    async deleteCategory(categoryId: number): Promise<boolean> {
        return await this.categoryRepository.delete(categoryId);
    }

    async getCategoryByUserID(userId: number): Promise<Category[]> {
        return await this.categoryRepository.getByUserId(userId);
    }
}