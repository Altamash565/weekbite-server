import { AppError } from "../../utils/AppError";
import { HTTP_STATUS } from "../../constants/http";
import { FavouriteRepository } from "./favorite.repository";
import { prisma } from "../../lib/prisma";

export class FavoriteService {
  private repository = new FavouriteRepository();

  async addFavorite(userId: string, recipeId: string) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      throw new AppError("Recipe not found", HTTP_STATUS.NOT_FOUND);
    }

    const existingFavorite = await this.repository.findByUserAndRecipe(
      userId,
      recipeId
    );

    if (existingFavorite) {
      throw new AppError(
        "Recipe is already in your favorites",
        HTTP_STATUS.CONFLICT
      );
    }

    return this.repository.create(userId, recipeId);
  }

  async getMyFavorites(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async removeFavorite(userId: string, recipeId: string) {
    const existingFavorite = await this.repository.findByUserAndRecipe(
      userId,
      recipeId
    );

    if (!existingFavorite) {
      throw new AppError(
        "Recipe is not in your favorites",
        HTTP_STATUS.NOT_FOUND
      );
    }

    await this.repository.delete(userId, recipeId);
  }
}
