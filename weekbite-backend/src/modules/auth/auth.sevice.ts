import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import { AuthRepository } from "./auth.repsitory";
import type { RegisterInput } from "./auth.validation";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterInput) {
    // 1. check if user already exists
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // 3. create user
    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    // 4. Remove sensitive fields
    const { password, refreshToken, ...safeUser } = user;

    return safeUser;
  }
}
