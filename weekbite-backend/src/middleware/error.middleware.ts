import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../lib/logger";
import { HTTP_STATUS } from "../constants/http";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
}
