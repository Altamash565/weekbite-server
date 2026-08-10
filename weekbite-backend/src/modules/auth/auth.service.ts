import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";
import { AuthRepository } from "./auth.repsitory";
import type { LoginInput, RegisterInput } from "./auth.validation";
import { HTTP_STATUS } from "../../constants/http";
import { createAuthTokens } from "./auth.tokens";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterInput) {
    // 1. check if user already exists
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError("User already exists", HTTP_STATUS.CONFLICT);
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // 3. create user
    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    // Repository already returns only safe fields
    return user;
  }

  async login(data: LoginInput) {
    // 1. find user by email
    const user = await this.repository.findByEmail(data.email);

    // 2. Don't reveal whether the email exists
    if (!user) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    //3. Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
    }

    //4. Generate access + refresh tokens
    const tokens = await createAuthTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    //5. Store hashed refresh token in database
    await this.repository.updateHashedRefreshToken(
      user.id,
      tokens.hashedRefreshToken,
    );

    //6. Remove sensitive fields
    const { password, hashedRefreshToken, ...safeUser } = user;

    //7. Return authentication result
    return {
      user: safeUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getMe(userId: string) {
    const user = await this.repository.findByEmail(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    return user;
  }
  
}
