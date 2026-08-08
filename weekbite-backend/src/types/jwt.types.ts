import type { Role } from "../generated/prisma/enums";

export interface JwtPayload {
    userId: string;
    email: string;
    role: Role;
}

