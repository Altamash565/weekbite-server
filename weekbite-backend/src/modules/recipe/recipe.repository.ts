import { prisma } from "../../lib/prisma";
import type { CreateRecipeInput, UpdateRecipeInput } from "./recipe.validation";

import type { GetRecipesQuery } from "./recipe.validation";

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
      },
    });
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
    return prisma.recipe.findMany({
      where: {
        createdById: userId,
      },

      include: {
        ingredients: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(recipeId: string, userId: string, data: UpdateRecipeInput) {
    return prisma.recipe.update({
      where: {
        id: recipeId,
        createdById: userId,
      },

      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        servings: data.servings,
        instructions: data.instructions,
        category: data.category,
      },

      include: {
        ingredients: true,
      },
    });
  }

  async delete(recipeId: string, userId: string) {
    return prisma.recipe.delete({
      where: {
        id: recipeId,
        createdById: userId,
      },
    });
  }

  async findMany(query: GetRecipesQuery) {
    const { search, category, page, limit, sortBy, sortOrder } = query;

    const where = {
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive" as const,
        },
      }),
      ...(category && { category }),
    };

    const orderBy =
      sortBy === "title"
        ? { title: sortOrder }
        : sortBy === "prepTime"
          ? { prepTime: sortOrder }
          : sortBy === "cookTime"
            ? { cookTime: sortOrder }
            : { createdAt: sortOrder };

    const [recipes, total] = await prisma.$transaction([
      prisma.recipe.findMany({
        where,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.recipe.count({ where }),
    ]);

    return {
      recipes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
