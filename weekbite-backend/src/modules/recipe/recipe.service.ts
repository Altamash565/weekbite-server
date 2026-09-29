import { AppError } from "../../utils/AppError";
import { HTTP_STATUS } from "../../constants/http";
import { RecipeRepository } from "./recipe.repository";
import type { CreateRecipeInput, UpdateRecipeInput } from "./recipe.validation";

export class RecipeService {
  private repository = new RecipeRepository();

  async createRecipe(userId: string, data: CreateRecipeInput) {
    const recipe = await this.repository.create(userId, data);

    return recipe;
  }

  async getRecipeById(recipeId: string) {
    const recipe = await this.repository.findById(recipeId);

    if (!recipe) {
      throw new AppError("Recipe not found", HTTP_STATUS.NOT_FOUND);
    }

    return recipe;
  }

  async getMyRecipes(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async updateRecipe(
    recipeId: string,
    userId: string,
    data: UpdateRecipeInput
  ) {
    const recipe = await this.repository.findById(recipeId);

    if (!recipe) {
      throw new AppError("Recipe not found", HTTP_STATUS.NOT_FOUND)
    }

    if(recipe.createdById !== userId) {
      throw new AppError(
        "You are not allowed to update this recipe",
        HTTP_STATUS.FORBIDDEN
      );
    }

    return this.repository.update(recipeId, userId, data);
  }

  async deleteRecipe(recipeId: string, userId: string) {
    const recipe = await this.repository.findById(recipeId);

    if (!recipe) {
      throw new AppError("Recipe not found", HTTP_STATUS.NOT_FOUND);
    }

    if (recipe.createdById !== userId) {
      throw new AppError(
        "You are not allowed to delete this recipe",
        HTTP_STATUS.FORBIDDEN
      );
    }

    await this.repository.delete(recipeId, userId);
  }
}
