import type { Request, Response } from "express";

import { FavoriteService } from "./favorite.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { HTTP_STATUS } from "../../constants/http";
import { AppError } from "../../utils/AppError";

export class FavoriteController {
    private service = new FavoriteService();

    addFavorite = asyncHandler(
        async (req: Request, res: Response) => {
            const recipeId = req.params.recipeId;

            if (!recipeId || Array.isArray(recipeId)) {
                throw new AppError(
                    "Invalid recipe ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            const favorite = await this.service.addFavorite(
                req.user!.userId,
                recipeId,
            );

            res.status(HTTP_STATUS.CREATED)
            .json(
                new ApiResponse(
                    true,
                    "Recipe added to favorites",
                    favorite,
                ),
            );
        },
    );

    getMyFavorites = asyncHandler(
        async (req: Request, res: Response) => {
            const favorites = await this.service.getMyFavorites(
                req.user!.userId,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Favorites fetched successfully",
                    favorites,
                ),
            );
        },
    );

    removeFavorite = asyncHandler(
        async (req: Request, res: Response) => {
            const recipeId = req.params.recipeId;

            if (!recipeId || Array.isArray(recipeId)) {
                throw new AppError(
                    "Invalid recipe ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            await this.service.removeFavorite(
                req.user!.userId,
                recipeId,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Recipe removed from favorites",
                ),
            );
        },
    );
}