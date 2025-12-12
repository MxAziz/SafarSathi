import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import type { IJwtPayload } from "../../types/common.js";
import sendResponse from "../../utils/sendResponse.js";
import { ReviewService } from "./reviews.service.js";
import { pick } from "../../utils/pick.js";

const addReview = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user as IJwtPayload;

    const result = await ReviewService.addReview(user, req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review added successfully",
      data: result,
    });
  }
);

const getMyReviews = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user as IJwtPayload;
    const result = await ReviewService.getMyReviews(user);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My reviews retrieved successfully",
      data: result,
    });
  }
);

const getReviewsForPlan = catchAsync(async (req: Request, res: Response) => {
  const { planId } = req.params;
  const result = await ReviewService.getReviewsForTravelPlan(planId as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews retrieved successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await ReviewService.getAllReviews(options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All reviews retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const updateReview = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user as IJwtPayload;
    const { reviewId } = req.params;
    const result = await ReviewService.updateReview(user, reviewId as string, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  }
);

const deleteReview = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user as IJwtPayload;
    const { reviewId } = req.params;
    await ReviewService.deleteReview(user, reviewId as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  }
);

export const ReviewController = {
  addReview,
  getMyReviews,
  getReviewsForPlan,
  getAllReviews,
  updateReview,
  deleteReview,
};