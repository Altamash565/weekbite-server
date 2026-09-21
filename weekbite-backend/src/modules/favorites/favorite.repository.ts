import { prisma } from "../../lib/prisma";

export class FavouriteRepository {
  async create(userId: string, recipeId: string) {
    return prisma.recipeFavourite.create({
      data: {
        userId,
        recipeId,
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

  async findByUserAndRecipe(userId: string, recipeId: string) {
    return prisma.recipeFavourite.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.recipeFavourite.findMany({
      where: {
        userId,
      },
      include: {
        recipe: {
          include: {
            ingredients: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(userId: string, recipeId: string) {
    return prisma.recipeFavourite.deleteMany({
      where: {
        userId,
        recipeId,
      },
    });
  }
}
