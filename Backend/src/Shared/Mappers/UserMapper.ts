import { User } from "../../core/Entities/User";

export class UserMapper {
  public static fromUserToDB(user: User): User {
    return user;
  }

  public static fromDBtoUser(user: any): User {
    return new User(
      user.Id,
      user.Name,
      user.Email,
      user.Password,
      user.Role,
      user.DeletionDate,
      user.ModifiedDate,
      user.CreationDate
    );
  }
}
