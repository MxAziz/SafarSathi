import AppError from "../../errorHelpers/AppError.js";
import catchAsync from "../../utils/catchAsync.js";
import { pick } from "../../utils/pick.js";
import sendResponse from "../../utils/sendResponse.js";
import { UserService } from "./user.service.js";
import type { Request, Response } from "express";
import httpStatus from 'http-status';


const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  //  const file = req.file;
  const result = await UserService.register(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Traveler registered successfully!",
    data: result,
  });
});

const getAllTravelers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", "currentLocation", "gender"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await UserService.getAllTravelers(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Travelers retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getTravelerById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.getTravelerById(id as string);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Traveler not found!");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Traveler retrieved successfully",
    data: result,
  });
});

export const UserController = {
    register,
    getAllTravelers,
    getTravelerById,
}