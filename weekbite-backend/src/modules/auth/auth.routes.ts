import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.validation";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

const controller = new AuthController();

router.post(
    "/register",
    validate(registerSchema),
    controller.register
);

router.post(
    "/login",
    validate(loginSchema),
    controller.login,
)

router.get(
    "/me",
    authenticate,
    controller.me,
)

router.post(
    "/refresh",
    controller.refresh,
)

export default router;