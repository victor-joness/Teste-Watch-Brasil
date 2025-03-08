import { IUserRepository } from "../Repositories/IRepositores/IUserRepository";
import { User } from "../Entities/User";
import { DeleteError } from "../../Shared/Errors/DeleteError";
import { HttpError } from "../../Shared/Errors/HttpError";
import { UpdateError } from "../../Shared/Errors/UpdateError";
import { GetError } from "../../Shared/Errors/GetError";
import { CreateError } from "../../Shared/Errors/CreateError";

export class UserServices {
  constructor(private userRepository: IUserRepository) {}

  async createUser(userData: User): Promise<User> {
    try {
      const newUser = await this.userRepository.create(userData);
      if (!newUser) {
        throw new CreateError("Error creating user, please try again.");
      }
      return newUser;
    } catch (error) {
      throw new HttpError("Internal Server Error", 500);
    }
  }

  async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await this.userRepository.getById(userId);
      if (!user) {
        throw new GetError("User not found");
      }
      return user;
    } catch (error) {
      throw new HttpError("Internal Server Error", 500);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.getAll();
      if (!users.length) {
        throw new GetError("No users found");
      }
      return users;
    } catch (error) {
      throw new HttpError("Internal Server Error", 500);
    }
  }

  async updateUser(userData: User): Promise<User | null> {
    try {
      const updatedUser = await this.userRepository.update(userData);
      if (!updatedUser) {
        throw new UpdateError("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new HttpError("Internal Server Error", 500);
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const deleted = await this.userRepository.delete(userId);
      if (!deleted) {
        throw new DeleteError("User not found");
      }
      return deleted;
    } catch (error) {
      throw new HttpError("Internal Server Error", 500);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw new HttpError("Internal Server Error", 500);
    }
  }
}
