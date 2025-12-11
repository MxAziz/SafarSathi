import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";
import httpStatus from 'http-status';

const getMe = catchAsync(async (req: Request, res: Response) => {
  const userSession = req.cookies;
  const result = await AuthService.getMe(userSession);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieve successfully!",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.login(payload);
  const { accessToken, refreshToken, needPasswordChange } = result;

  const userTokens = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  setAuthCookie(res, userTokens);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Your login is successfully",
    data: {
      needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);
  const userToken = {
    accessToken: result.accessToken,
  };

  setAuthCookie(res, userToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token generated successfully!",
    data: {
      message: "Access token generated successfully!",
    },
  });
});

export const AuthController = {
  getMe,
  login,
  refreshToken
};