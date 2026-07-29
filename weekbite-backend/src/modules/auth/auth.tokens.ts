import bcrypt from "bcrypt";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../lib/jwt";

import type { JwtPayload } from "../../types/jwt.types";

export async function createAuthTokens(payload: JwtPayload) {
  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

  return {
    accessToken,
    refreshToken,
    hashedRefreshToken,
  };
}