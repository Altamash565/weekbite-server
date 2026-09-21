import { prisma } from "../../lib/prisma";

import type {
  CreateGroceryItemInput,
  CreateGroceryListInput,
  UpdateGroceryItemInput,
  UpdateGroceryListInput,
} from "./grocery-list.validation";

export class GroceryListRepository {
  async createList(userId: string, data: CreateGroceryListInput) {
    return prisma.groceryList.create({
      data: {
        name: data.name,
        userId,
      },
      include: {
        items: true,
      },
    });
  }

  async findListsByUserId(userId: string) {
    return prisma.groceryList.findMany({
      where: {
        userId,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findListById(id: string, userId: string) {
    return prisma.groceryList.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
      },
    });
  }

  async updateList(id: string, userId: string, data: UpdateGroceryListInput) {
    return prisma.groceryList.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        ...(data.name !== undefined && {
          name: data.name,
        }),
      },
    });
  }

  async deleteList(id: string, userId: string) {
    return prisma.groceryList.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async createItem(groceryListId: string, data: CreateGroceryItemInput) {
    return prisma.groceryItem.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        groceryListId,
      },
    });
  }

  async findItemById(itemId: string, groceryListId: string) {
    return prisma.groceryItem.findFirst({
      where: {
        id: itemId,
        groceryListId,
      },
    });
  }

  async updateItem(
    itemId: string,
    groceryListId: string,
    data: UpdateGroceryItemInput
  ) {
    return prisma.groceryItem.updateMany({
      where: {
        id: itemId,
        groceryListId,
      },
      data: {
        ...(data.name !== undefined && {
          name: data.name,
        }),

        ...(data.quantity !== undefined && {
          quantity: data.quantity,
        }),

        ...(data.isPurchased !== undefined && {
          isPurchased: data.isPurchased,
        }),
      },
    });
  }

  async deleteItem(itemId: string, groceryListId: string) {
    return prisma.groceryItem.deleteMany({
      where: {
        id: itemId,
        groceryListId,
      },
    });
  }
}
