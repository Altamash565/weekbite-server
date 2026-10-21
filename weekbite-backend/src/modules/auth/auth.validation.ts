import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().min(8),
});

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(50)
      .optional(),

    avatar: z.url("Invalid avatar URL").nullable().optional(),
  })
  .refine((data) => data.name !== undefined || data.avatar !== undefined, {
    message: "At least one field must be provided",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
