// import { Prisma } from "../../generated/prisma/client";
import { AppError } from "../../utils/AppError";
import { HTTP_STATUS } from "../../constants/http";
import { MealPlanRepository} from "./meal-plan.repository";
import type { CreateMealPlanInput, UpdateMealPlanInput } from "./meal-plan.validation";

export class MealPlanService {
    private repository = new MealPlanRepository();

async createMealPlan(
  userId: string,
  data: CreateMealPlanInput,
) {
  try {
    return await this.repository.create(userId, data);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "A meal already exists for this meal type on this date",
        HTTP_STATUS.CONFLICT,
      );
    }

    throw error;
  }
}
    async getMealPlanById (
        id: string,
        userId: string,
    ) {
        const mealPlan = await this.repository.findById(
            id,
            userId,
        );

        if (!mealPlan) {
            throw new AppError(
                "Meal plan not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return mealPlan;
    }

    async getMyMealPlans(
        userId: string,
        startDate: Date,
        endDate: Date,
    ) {
        return this.repository.findByUserId(
            userId,
            startDate,
            endDate,
        );
    }

    async deleteMealPlan(
        id: string,
        userId: string,
    ) {
        const result = await this.repository.delete(
            id,
            userId,
        );

        if (result.count === 0) {
            throw new AppError(
                "Meal plan not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return result;
    }

   async updateMealPlan(
  id: string,
  userId: string,
  data: UpdateMealPlanInput,
) {
  try {
    const result = await this.repository.update(
      id,
      userId,
      data,
    );

    if (result.count === 0) {
      throw new AppError(
        "Meal plan not found",
        HTTP_STATUS.NOT_FOUND,
      );
    }

    return this.repository.findById(id, userId);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new AppError(
        "A meal already exists for this meal type on this date",
        HTTP_STATUS.CONFLICT,
      );
    }

    throw error;
  }
}

}