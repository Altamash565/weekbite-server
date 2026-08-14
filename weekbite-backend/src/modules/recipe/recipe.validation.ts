import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long").max(100),

  description: z.string().trim().max(500).optional(),

  image: z.url("Invalid image URL").optional(),

  prepTime: z.number().int().min(0, "'Cooking time cannot be negative"),

  servings: z.number().int().min(1, "Serving must be at least 1"),

  instructions: z.number().int().min(1, "Instructions must be at least 10 characters long"),
  

  category: z.enum([
    "BREAKFAST",
    "LUNCH",
    "DINNER",
    "SNACK",
    "DESSERT",
    "OTHER",
]),

 ingredients: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, "Ingredient name is required"),

        quantity: z
          .string()
          .trim()
          .min(1, "Ingredient quantity is required"),
      }),
    )
    .min(1, "At least one ingredient is required"),


});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
