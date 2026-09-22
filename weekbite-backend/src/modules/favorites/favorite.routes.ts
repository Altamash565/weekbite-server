import { Router } from "express";

import { FavoriteController } from "./favorite.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();
const controller = new FavoriteController();

router.post(
    "/:recipeId",
    authenticate,
    controller.addFavorite,
);

router.get(
    "/",
    authenticate,
    controller.getMyFavorites,
);

router.delete(
    "/:recipeId",
    authenticate,
    controller.removeFavorite,
)

export default router;