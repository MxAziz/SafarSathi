import type { IJwtPayload } from "../../types/common.js";
import catchAsync from "../../utils/catchAsync.js";
import type { Request, Response } from "express";
import { TravelService } from "./travelPlans.service.js";
import sendResponse from "../../utils/sendResponse.js";
import { pick } from "../../utils/pick.js";


const createTravelPlan = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const payload = {
      ...req.body,
      imageUrl: req.file?.path,
    };
    const travelerEmail = req?.user?.email;
    const result = await TravelService.createTravelPlan(
      payload,
      travelerEmail as string
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Create Travel Plane successfully",
      data: result,
    });
  }
);

const getMyTravelPlans = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user as IJwtPayload;
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await TravelService.getMyTravelPlans(user, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My travel plans retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const TravelController = {
  createTravelPlan,
  getMyTravelPlans,
};