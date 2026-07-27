import type { Request, Response } from "express";
import { AuthService } from "./auth.sevice";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

export class AuthController {
  private service = new AuthService();

  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.register(req.body);

    res
      .status(201)
      .json(new ApiResponse(true, "User Registered successfully", user));
  });
}
