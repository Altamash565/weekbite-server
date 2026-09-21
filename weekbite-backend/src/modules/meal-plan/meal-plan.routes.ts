import { Router } from "express";

import { MealPlanController } from "./meal-plan.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
  createMealPlanSchema,
  updateMealPlanSchema,
} from "./meal-plan.validation";

const router = Router();

const controller = new MealPlanController();

// Create meal plan
router.post(
  "/",
  authenticate,
  validate(createMealPlanSchema),
  controller.create
);

// Get logged-in user's meal plans
router.get("/", authenticate, controller.getMyMealPlans);

// Get meal plan by ID
router.get("/:id", authenticate, controller.getById);

// Update meal plan
router.patch(
  "/:id",
  authenticate,
  validate(updateMealPlanSchema),
  controller.update
);

// Delete meal plan
router.delete("/:id", authenticate, controller.delete);

export default router;
