import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import {HTTP_STATUS} from "../constants/http";

export function notFound(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(new AppError(`Cannot find ${req.method} ${req.originalUrl} on this server!`, HTTP_STATUS.NOT_FOUND));    
}

