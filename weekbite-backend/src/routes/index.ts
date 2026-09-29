import { Router } from "express";

import { authRoutes } from "../modules/auth";
import { recipeRoutes } from "../modules/recipe";
import { mealPlanRoutes } from "../modules/meal-plan";
import { groceryListRoutes } from "../modules/grocery-list";
import { favoriteRoutes } from "../modules/favorites";

const router = Router();

router.use("/auth", authRoutes);

router.use("/recipes", recipeRoutes);

router.use("/meal-plans", mealPlanRoutes);

router.use("/grocery-lists", groceryListRoutes);

router.use("/favorites", favoriteRoutes);

export default router;