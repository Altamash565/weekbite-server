import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { registerSchema } from "./auth.validation";

const router = Router();

const controller = new AuthController();

router.post(
    "/register",
    validate(registerSchema),
    controller.register
);

export default router;