import type { Request, Response } from "express";

import { GroceryListService } from "./grocery-list.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { HTTP_STATUS } from "../../constants/http";
import { AppError } from "../../utils/AppError";

export class GroceryListController {
    private service = new GroceryListService();

    createList = asyncHandler(async (req: Request, res: Response) => {
        const groceryList = await this.service.createList(
            req.user!.userId,
            req.body,
        );

        res.status(HTTP_STATUS.CREATED)
        .json(
            new ApiResponse(
                true,
                "Grocery list created successfully",
                groceryList,
            ),
        );
    });

    getMyLists = asyncHandler(async (req: Request, res: Response) => {
        const groceryLists = await this.service.getMyLists(
            req.user!.userId,
        );

        res.status(HTTP_STATUS.OK)
        .json(
            new ApiResponse(
                true,
                "Grocery lists fetched successfully",
                groceryLists,
            ),
        );
    });

    getListById = asyncHandler(
        async (req: Request, res: Response) => {
            const groceryListId = req.params.id;

            if (!groceryListId || Array.isArray(groceryListId)) {
                throw new AppError(
                    "Invalid grocery list ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            const groceryList = await this.service.getListById(
                groceryListId,
                req.user!.userId,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Grocery list fetched successfully",
                    groceryList,
                ),
            );
        },
    );

    updateList = asyncHandler(
        async (req: Request, res: Response) => {
            const groceryListId = req.params.id;

            if (!groceryListId || Array.isArray(groceryListId)) {
                throw new AppError(
                    "Invalid grocery list ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            const groceryList = await this.service.updateList(
                groceryListId,
                req.user!.userId,
                req.body,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Grocery list updated successfully",
                    groceryList,
                ),
            );
        },
    );

    deleteList = asyncHandler(
        async (req: Request, res: Response) => {
            const groceryListId = req.params.id;

            if (!groceryListId || Array.isArray(groceryListId)) {
                throw new AppError(
                    "Invalid grocery list ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            await this.service.deleteList(
                groceryListId,
                req.user!.userId,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Grocery list deleted successfully",
                ),
            );
        },
    );

    addItem = asyncHandler(async (req: Request, res: Response) => {
        const groceryListId = req.params.id;

        if (!groceryListId || Array.isArray(groceryListId)) {
            throw new AppError(
                "Invalid grocery list ID",
                HTTP_STATUS.BAD_REQUEST,
            );
        }

        const item = await this.service.addItem(
            groceryListId,
            req.user!.userId,
            req.body,
        );

        res.status(HTTP_STATUS.CREATED)
        .json(
            new ApiResponse(
                true, 
                "Grocery item added successfully",
                item,
            ),
        );
    });

    updateItem = asyncHandler(
        async (req: Request, res: Response) => {
            const groceryListId = req.params.id;
            const itemId = req.params.itemId;


            if (
                !groceryListId || 
                Array.isArray(groceryListId) || 
                !itemId || Array.isArray(itemId)
            ) {
                throw new AppError(
                    "Invalid grocery list or item ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            const item = await this.service.updateItem(
                groceryListId,
                itemId,
                req.user!.userId,
                req.body,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Grocery item updated successfully",
                    item,
                ),
            );
        },
    );

    deleteItem = asyncHandler(
        async (req: Request, res: Response) => {
            const groceryListId = req.params.id;
            const itemId = req.params.itemId;

            if (
                !groceryListId || 
                Array.isArray(groceryListId) ||
                !itemId || 
                Array.isArray(itemId) 
            ) {
                throw new AppError(
                    "Invalid grocery list or item ID",
                    HTTP_STATUS.BAD_REQUEST,
                );
            }

            await this.service.deleteItem(
                groceryListId,
                itemId,
                req.user!.userId,
            );

            res.status(HTTP_STATUS.OK)
            .json(
                new ApiResponse(
                    true,
                    "Grocery item deleted successfully",
                ),
            );
        },
    );
}