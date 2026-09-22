import { Router } from "express";

import { GroceryListController } from "./grocery-list.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
  createGroceryItemSchema,
  createGroceryListSchema,
  updateGroceryItemSchema,
  updateGroceryListSchema,
} from "./grocery-list.validation";

const router = Router();
const controller = new GroceryListController();

router.post(
  "/",
  authenticate,
  validate(createGroceryListSchema),
  controller.createList
);

router.get("/", authenticate, controller.getMyLists);

router.get("/:id", authenticate, controller.getListById);

router.patch(
  "/:id",
  authenticate,
  validate(updateGroceryListSchema),
  controller.updateList
);

router.delete("/:id", authenticate, controller.deleteList);

router.post(
  "/:id/items",
  authenticate,
  validate(createGroceryItemSchema),
  controller.addItem
);

router.patch(
  "/:id/items/:itemId",
  authenticate,
  validate(updateGroceryItemSchema),
  controller.updateItem
);

router.delete("/:id/items/:itemId", authenticate, controller.deleteItem);

export default router;
