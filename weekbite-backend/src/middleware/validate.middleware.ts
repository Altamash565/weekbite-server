import type { NextFunction, Request, Response } from "express";

import type { ZodType } from "zod";

export const validate = 
<T>(schema: ZodType<T>) =>
(req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            success: false,
            message: "validation failed",
            errors: result.error.flatten().fieldErrors,
        });
    }

    req.body = result.data

    next()
}