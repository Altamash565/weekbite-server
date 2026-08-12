import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { HTTP_STATUS } from "../../constants/http";
import {
  accessTokenCookieOptions,
  clearCookieOptions,
  refreshTokenCookieOptions,
} from "../../constants/cookies";

export class AuthController {
  private service = new AuthService();

  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.register(req.body);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "User Registered successfully", user));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.service.login(req.body);

    res.cookie("accessToken", result.accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", result.refreshToken, refreshTokenCookieOptions);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Login successfull", result.user));
  });

  me = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.service.getMe(req.user!.userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "User fetched successfully", user));
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    const tokens = await this.service.refresh(refreshToken);

    res.cookie("accessToken", tokens.accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieOptions);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Token refreshed successfully"));
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    await this.service.logout(req.user!.userId);

    res.clearCookie("accessToken", clearCookieOptions);
    res.clearCookie("refreshToken", clearCookieOptions);

    res.status(HTTP_STATUS.OK).json(new ApiResponse(true, "Logout successful"));
  });
}
