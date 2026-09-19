import { AppError } from "../../utils/AppError";
import { HTTP_STATUS } from "../../constants/http";
import { GroceryListRepository } from "./grocery-list.repository";
import type {
    CreateGroceryItemInput,
    CreateGroceryListInput,
    UpdateGroceryItemInput,
    UpdateGroceryListInput
} from "./grocery-list.validation";

export class GroceryListService {
    private repository = new GroceryListRepository();

    async createList(
        userId: string,
        data: CreateGroceryListInput,
    ) {
        return this.repository.createList(userId, data);
    }

    async getMyLists(userId: string) {
        return this.repository.findListsByUserId(userId)
    }

    async getListById(id: string, userId: string) {
        const groceryList = await this.repository.findListById(
            id,
            userId,
        );

        if (!groceryList) {
            throw new AppError(
                "Grocery list not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return groceryList;
    }

    async updateList(
        id: string,
        userId: string,
        data: UpdateGroceryListInput,
    ) {
        const result = await this.repository.updateList(
            id,
            userId,
            data
        );

        if (result.count === 0) {
            throw new AppError(
                "Grocery list not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return this.repository.findListById(id, userId);
    }

    async deleteList(id: string, userId: string) {
        const result = await this.repository.deleteList(
            id,
            userId,
        );

        if (result.count === 0) {
            throw new AppError(
                "Grocery list not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return result;
    }

    async addItem(
        groceryListId: string,
        userId: string,
        data: CreateGroceryItemInput,
    ) {
        const groceryList = await this.repository.findItemById(
            groceryListId,
            userId,
        );

        if (!groceryList) {
            throw new AppError(
                "Grocery list not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return this.repository.createItem(
            groceryListId,
            data,
        );
    }

    async updateItem(
        groceryListId: string,
        itemId: string,
        userId: string,
        data: UpdateGroceryItemInput,
    ) {
        const groceryList = await this.repository.findListById(
            groceryListId,
            userId,
        );

        if (!groceryList) {
            throw new AppError(
                "Grocery list not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        const result = await this.repository.updateItem(
            itemId,
            groceryListId,
            data,
        );

        if (result.count === 0) {
            throw new AppError(
                "Grocery item not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        return this.repository.findItemById(
            itemId,
            groceryListId,
        );
    }

    async deleteItem(
        groceryListId: string,
        itemId: string,
        userId: string,
    ) {
        const groceryList = await this.repository.findListById(
            groceryListId,
            userId,
        );

        if (!groceryList) {
            throw new AppError(
                "Grocery list not found",
                HTTP_STATUS.NOT_FOUND,
            );
        }

        const result = await this.repository.deleteItem(
            itemId,
            groceryListId,
        );

        if(result.count === 0) {
            throw new AppError(
                "Grocery item not found",
                HTTP_STATUS.NOT_FOUND
            );
        }

        return result;
    }
}