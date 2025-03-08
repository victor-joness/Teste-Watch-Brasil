import { sql } from "drizzle-orm";
import { db } from "../../Infrastructure/database/db";
import { categoriesTable } from "../../Infrastructure/database/schemas/categoriesTable";
import { CategoriesMapper } from "../../Shared/Mappers/CategoriesMapper";
import { Category } from "../Entities/Category";
import { BaseRepository } from "./BaseRepository";
import { ICategoryRepository } from "./IRepositores/ICategoryRepository";

export class CategoryRepository
  extends BaseRepository<Category>
  implements ICategoryRepository
{
  constructor() {
    super(categoriesTable, {
      fromEntityToDB: CategoriesMapper.fromCategoryToDB,
      fromDBToEntity: CategoriesMapper.fromDBtoCategory,
    });

    this.table = categoriesTable;
    this.mapper = {
      fromEntityToDB: CategoriesMapper.fromCategoryToDB,
      fromDBToEntity: CategoriesMapper.fromDBtoCategory,
    };
  }
  async getByUserId(userId: number): Promise<Category[]> {
    try {
      const result = await db
        .select()
        .from(this.table)
        .where(sql`assigned_to = ${userId} AND deletion_date IS NULL`);

      return result.map((row: any) => this.mapper.fromDBToEntity(row));
    } catch (error) {
      throw new Error("Falha ao buscar categorias");
    }
  }
}
