import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/client";
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants/http";

export function authorize(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(
                new AppError(
                    "Authentication required",
                    HTTP_STATUS.FORBIDDEN,
                ),
            );
        }
        next();
    }
}