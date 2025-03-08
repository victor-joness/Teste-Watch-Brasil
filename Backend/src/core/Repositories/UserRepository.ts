import { sql } from "drizzle-orm";
import { db } from "../../Infrastructure/database/db";
import { usersTable } from "../../Infrastructure/database/schemas/usersTable";
import { UserMapper } from "../../Shared/Mappers/UserMapper";
import { User } from "../Entities/User";
import { BaseRepository } from "./BaseRepository";
import { IUserRepository } from "./IRepositores/IUserRepository";

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(usersTable, {
      fromEntityToDB: UserMapper.fromUserToDB,
      fromDBToEntity: UserMapper.fromDBtoUser,
    });

    this.table = usersTable;
    this.mapper = {
      fromEntityToDB: UserMapper.fromUserToDB,
      fromDBToEntity: UserMapper.fromDBtoUser,
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(sql`email = ${email} AND deletion_date IS NULL`)
      .limit(1);

    return result.length > 0 ? UserMapper.fromDBtoUser(result[0]) : null;
  }
}