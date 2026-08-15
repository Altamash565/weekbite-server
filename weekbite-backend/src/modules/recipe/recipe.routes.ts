import { Router } from "express";

import { RecipeController } from "./recipe.controller";
import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { createRecipeSchema } from "./recipe.validation";


const router = Router();

const controller = new RecipeController();

/*
|--------------------------------------------------------------------------
| Recipe Routes
|--------------------------------------------------------------------------
*/


// Create recipe 
router.post(
    "/",
    authenticate,
    validate(createRecipeSchema),
    controller.create,
);

// Get all recipes created by logged-in user
router.get(
    "/my",
    authenticate,
    controller.getMyRecipes,
);

// Get recipe by ID
router.get(
    "/:id",
    authenticate,
    controller.getById,
);

export default router
