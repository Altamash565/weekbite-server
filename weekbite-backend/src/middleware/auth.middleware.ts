import type { NextFunction, Request, Response } from "express";

import {verifyAccessToken} from "../lib/jwt"
import { AppError } from "../utils/AppError";
import { HTTP_STATUS } from "../constants/http";

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const token = req.cookies?.accessToken;

    if (!token) {
        return next (
            new AppError(
                "Authentication required",
                HTTP_STATUS.UNAUTHORIZED,
            ),
        );
    }

    try{
        const payload = verifyAccessToken(token);

        req.user = payload;

        next();
    } catch {
        return next(
            new AppError(
                "Invalid or expired access token",
                HTTP_STATUS.UNAUTHORIZED,
            ),
        );
    }
}