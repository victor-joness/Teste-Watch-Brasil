import { RoleEnum } from "../../Shared/Enum/Enums";
import { BaseEntity } from "./BaseEntity";

export class User extends BaseEntity {
  public Name: string;
  public Email: string;
  public Password: string;
  public Role: RoleEnum;

  constructor(
    Id: number,
    Name: string,
    Email: string,
    Password: string,
    Role: RoleEnum,
    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string | null
  ) {
    super(Id, DeletionDate ?? null, ModifiedDate ?? null, CreationDate ?? null);
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Role = Role;
  }
}
