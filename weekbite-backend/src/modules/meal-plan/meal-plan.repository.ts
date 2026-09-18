import { prisma } from "../../lib/prisma";
import type { CreateMealPlanInput, UpdateMealPlanInput } from "./meal-plan.validation";


export class MealPlanRepository {
    async create(userId: string, data: CreateMealPlanInput) {
        return prisma.mealPlan.create({
            data: {
                date: data.date,
                mealType: data.mealType,
                recipeId: data.recipeId,
                userId,
            },
            include: {
                recipe: {
                    include: {
                        ingredients: true,
                    },
                },
            },

        });
    }

    async findById(id: string, userId: string) {
        return prisma.mealPlan.findFirst({
            where: {
                id,
                userId
            },
            include: {
                recipe: {
                    include: {
                        ingredients: true,
                    },
                },
            },
        });
    }

    async findByUserId(
        userId: string,
        startDate: Date,
        endDate: Date,
    ) {
        return prisma.mealPlan.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    It: endDate,
                },

            },

            include: {
                recipe: {
                    include: {
                        ingredients: true,
                    },
                },
            },
            orderBy: {
                date: "asc",
            }
        });
    }

    async delete(id: string, userId: string) {
        return prisma.mealPlan.deleteMany({
            where: {
                id,
                userId,
            },
        });
    }

    async update(id: string, userId: string, data: UpdateMealPlanInput,) {
        return prisma.mealPlan.updateMany({
            where: {
                id,
                userId,
            },
            data: {
                ...(data.date !== undefined && {
                    date: data.date,
                }),

                ...(data.mealType !== undefined && {
                    mealType: data.mealType,
                }),

                ...(data.recipeId !== undefined && {
                    recipeId: data.recipeId,
                }),
            },
        });
    }
}