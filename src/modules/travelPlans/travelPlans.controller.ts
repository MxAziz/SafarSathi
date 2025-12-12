import type { IJwtPayload } from "../../types/common.js";
import catchAsync from "../../utils/catchAsync.js";
import type { Request, Response } from "express";
import { TravelService } from "./travelPlans.service.js";
import sendResponse from "../../utils/sendResponse.js";


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

export const TravelController = {
  createTravelPlan,
};