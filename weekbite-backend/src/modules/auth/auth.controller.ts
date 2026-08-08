import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import {HTTP_STATUS} from "../../constants/http";

export class AuthController {
  private service = new AuthService();

  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.register(req.body);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "User Registered successfully", user));
  });
}
