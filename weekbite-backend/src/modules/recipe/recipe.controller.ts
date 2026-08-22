import type { Request, Response } from "express";

import { RecipeService } from "./recipe.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { HTTP_STATUS } from "../../constants/http";
import { AppError } from "../../utils/AppError";

export class RecipeController {
  private service = new RecipeService();

  create = asyncHandler(async (req: Request, res: Response) => {
    const recipe = await this.service.createRecipe(req.user!.userId, req.body);

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Recipe created successfully", recipe));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const recipeId = req.params.id;

    if (!recipeId || Array.isArray(recipeId)) {
      throw new AppError("Invalid recipe ID", HTTP_STATUS.BAD_REQUEST);
    }

    const recipe = await this.service.getRecipeById(recipeId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Recipe fetched successfully", recipe));
  });

  getMyRecipes = asyncHandler(async (req: Request, res: Response) => {
    const recipes = await this.service.getMyRecipes(req.user!.userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Recipes fetched successfully", recipes));
  });
}
