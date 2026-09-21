import type { Request, Response } from "express";

import { MealPlanService } from "./meal-plan.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { HTTP_STATUS } from "../../constants/http";
import { AppError } from "../../utils/AppError";

export class MealPlanController {
  private service = new MealPlanService();

  create = asyncHandler(async (req: Request, res: Response) => {
    const mealPlan = await this.service.createMealPlan(
      req.user!.userId,
      req.body
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Meal plan created successfully", mealPlan));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const mealPlanId = req.params.id;

    if (!mealPlanId || Array.isArray(mealPlanId)) {
      throw new AppError("Invalid meal plan ID", HTTP_STATUS.BAD_REQUEST);
    }

    const mealPlan = await this.service.getMealPlanById(
      mealPlanId,
      req.user!.userId
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Meal plan fetched successfully", mealPlan));
  });

  getMyMealPlans = asyncHandler(async (req: Request, res: Response) => {
    const startDate = new Date(req.query.startDate as string);
    const endDate = new Date(req.query.endDate as string);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new AppError("Invalid date range", HTTP_STATUS.BAD_REQUEST);
    }

    const mealPlans = await this.service.getMyMealPlans(
      req.user!.userId,
      startDate,
      endDate
    );

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(true, "Meal plans fetched successfully", mealPlans)
      );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const mealPlanId = req.params.id;

    if (!mealPlanId || Array.isArray(mealPlanId)) {
      throw new AppError("Invalid meal plan ID", HTTP_STATUS.BAD_REQUEST);
    }

    await this.service.deleteMealPlan(mealPlanId, req.user!.userId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Meal plan deleted successfully"));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const mealPlanId = req.params.id;

    if (!mealPlanId || Array.isArray(mealPlanId)) {
      throw new AppError("Invalid meal plan ID", HTTP_STATUS.BAD_REQUEST);
    }

    const mealPlan = await this.service.updateMealPlan(
      mealPlanId,
      req.user!.userId,
      req.body
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Meal plan upload successfully", mealPlan));
  });
}
