import { Category } from "../../Entities/Category";
import { IBaseRepository } from "./IBaseRepository";

export interface ICategoryRepository extends IBaseRepository<Category> {
    getByUserId(userId: number): Promise<Category[]>
}