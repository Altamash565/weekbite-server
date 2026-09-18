import { z } from "zod";

export const createMealPlanSchema = z.object({
    date: z.coerce.date(),

    mealType: z.enum([
        "BREAKFAST",
        "LUNCH",
        "DINNER",
        "SNACK",
    ]),

    recipeId: z.uuid(),
});

export type CreateMealPlanInput = z.infer<typeof createMealPlanSchema>;

export const updateMealPlanSchema = z.object({
  date: z.coerce.date().optional(),

  mealType: z
    .enum([
      "BREAKFAST",
      "LUNCH",
      "DINNER",
      "SNACK",
    ])
    .optional(),

  recipeId: z.uuid().optional(),
});

export type UpdateMealPlanInput = z.infer<
  typeof updateMealPlanSchema
>;
