import { prisma } from "../../lib/prisma";
import type { CreateRecipeInput } from "./recipe.validation";

export class RecipeRepository {
    async create(userId: string, data: CreateRecipeInput) {
        return prisma.recipe.create({
            data: {
                title: data.title,
                description: data.description,
                image: data.image,
                prepTime: data.prepTime,
                cookTime: data.cookTime,
                servings: data.servings,
                instructions: data.instructions,
                category: data.category,

                createdById: userId,


                ingredients: {
                    create: data.ingredients.map((ingredient) => ({
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    })),
                },
            },

            include: {
                ingredients: true,
            }
        })
    }

    async findById(id: string) {
        return prisma.recipe.findUnique({
            where: {
                id,
            },

            include: {
                ingredients: true,
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async findByUserId(userId: string) {
        return prisma.recipe.findMany ({
            where: {
                createdById: userId,
            },

            include: {
                ingredients: true,
            },

            orderBy: {
                createdAt: "desc",
            }
        })
    }
}