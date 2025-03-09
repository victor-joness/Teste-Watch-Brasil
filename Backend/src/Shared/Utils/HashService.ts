import bcrypt from "bcryptjs";

export class HashService {
  private readonly saltRounds = 10;

  public async Hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public async Compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
} 