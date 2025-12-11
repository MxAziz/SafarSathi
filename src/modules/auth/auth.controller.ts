import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";


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

export const AuthController = {
  login,
};