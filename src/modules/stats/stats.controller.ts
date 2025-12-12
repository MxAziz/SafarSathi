import type { Request, Response } from "express";
import type { IJwtPayload } from "../../types/common.js";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { StatsService } from "./stats.service.js";

const getTravelerDashboardData = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user as IJwtPayload;
    const result = await StatsService.getTravelerDashboardData(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Dashboard data retrieved successfully",
      data: result,
    });
  }
);

const getAdminDashboardData = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StatsService.getAdminDashboardData();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin Dashboard data retrieved successfully",
      data: result,
    });
  }
);

export const StatsController = {
  getTravelerDashboardData,
  getAdminDashboardData,
};