import { z } from "zod";

export const createGroceryListSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "List name is required")
    .max(100, "List name must be at most 100 characters"),
});

export const updateGroceryListSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "List name is required")
    .max(100, "List name must be at most 100 characters")
    .optional(),
});

export const createGroceryItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Item name is required")
    .max(100, "Item name must be at most 100 characters"),

  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .max(50, "Quantity must be at most 50 characters"),
});

export const updateGroceryItemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Item name is required")
    .max(100, "Item name must be at most 100 characters")
    .optional(),

  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .max(50, "Quantity must be at most 50 characters")
    .optional(),

  isPurchased: z.boolean().optional(),
});

export type CreateGroceryListInput = z.infer<typeof createGroceryListSchema>;

export type UpdateGroceryListInput = z.infer<typeof updateGroceryListSchema>;

export type CreateGroceryItemInput = z.infer<typeof createGroceryItemSchema>;

export type UpdateGroceryItemInput = z.infer<typeof updateGroceryItemSchema>;
