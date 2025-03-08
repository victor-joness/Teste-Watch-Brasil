import { IBaseRepository } from "./IRepositores/IBaseRepository";
import { db } from "../../Infrastructure/database/db";
import { sql, eq } from "drizzle-orm";

export class BaseRepository<T> implements IBaseRepository<T> {
  protected table: any;
  protected mapper: {
    fromEntityToDB: (entity: T) => any;
    fromDBToEntity: (row: any) => T;
  };

  constructor(
    table: any,
    mapper: {
      fromEntityToDB: (entity: T) => any;
      fromDBToEntity: (row: any) => T;
    }
  ) {
    this.table = table;
    this.mapper = mapper;
  }

  async getAll(): Promise<T[]> {
    const result = await db
      .select()
      .from(this.table)
      .where(sql`deletion_date IS NULL`);

    return result.map((row: any) => this.mapper.fromDBToEntity(row));
  }

  async getById(id: number): Promise<T | null> {
    const result = await db
      .select()
      .from(this.table)
      .where(sql`Id = ${id} AND deletion_date IS NULL`)
      .limit(1);

    return result.length > 0 ? this.mapper.fromDBToEntity(result[0]) : null;
  }

  async create(entity: T): Promise<T> {
    const dbEntity = this.mapper.fromEntityToDB(entity);

    try {
      const createdEntity = await db
      .insert(this.table)
      .values(dbEntity)
      .returning();

      return this.mapper.fromDBToEntity(createdEntity[0]);
    } catch (error) {
      throw error;
    }
  }

  async update(entity: T): Promise<T> {
    const dbEntity = this.mapper.fromEntityToDB(entity);

    const updatedEntity = await db
      .update(this.table)
      .set(dbEntity)
      .where(eq(this.table.Id, dbEntity.Id))
      .returning();

    return this.mapper.fromDBToEntity(updatedEntity[0]);
  }

  async delete(id: number): Promise<any> {
    const result = await db
      .update(this.table)
      .set({ DeletionDate: new Date().toISOString() })
      .where(eq(this.table.Id, id))
      .returning();

    return result;
  }
}
