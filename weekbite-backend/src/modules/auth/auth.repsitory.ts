import { prisma } from "../../lib/prisma";
import type { RegisterInput } from "./auth.validation";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: RegisterInput & { password: string }) {
    return prisma.user.create({
      data,
    });
  }
}
