import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { verifyToken } from "../utils/jwt.js";
import type { IJwtPayload } from "../types/common.js";
import AppError from "../errorHelpers/AppError.js";
import { prisma } from "../lib/prisma.js";
import { UserStatus } from "../../generated/prisma/enums.js";

export const checkAuth =
  (...roles: string[]) =>
  async (
    req: Request & { user?: IJwtPayload },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization || req.cookies.accessToken;
      if (!token) {
        throw new AppError(401, "Please log in to continue.");
      }

      const verify_Token = verifyToken(
        token,
        config.JWT.ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      if (!verify_Token) {
        throw new AppError(403, "Invalid access token");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: verify_Token.email,
        },
      });
      if (!user) {
        throw new AppError(404, "Email does not exist");
      }

      if (
        user.status === UserStatus.BLOCKED ||
        user.status === UserStatus.INACTIVE
      ) {
        throw new AppError(403, `Your account is ${user.status}`);
      }

      if (user.isDeleted === true) {
        throw new AppError(404, "Your account is deleted");
      }

      if (roles.length > 0 && !roles.includes(verify_Token.role)) {
        throw new AppError(403, "You are not authorized to access this route");
      }

      req.user = verify_Token as IJwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };