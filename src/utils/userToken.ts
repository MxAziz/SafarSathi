import type { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { generateToken, verifyToken } from "./jwt.js";
import AppError from "../errorHelpers/AppError.js";
import httpStatus from "http-status";
import { prisma } from "../lib/prisma.js";
import { UserStatus } from "../../generated/prisma/enums.js";

type TokenPayload = {
  email: string;
  role: string;
  id: string;
};

export const createUserTokens = (tokenPayload: TokenPayload) => {
  const accessToken = generateToken(
    tokenPayload,
    config.JWT.ACCESS_TOKEN_SECRET,
    config.JWT.ACCESS_TOKEN_EXPIRATION
  );

  const refreshToken = generateToken(
    tokenPayload,
    config.JWT.REFRESH_TOKEN_SECRET,
    config.JWT.REFRESH_TOKEN_EXPIRATION
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenUseRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    config.JWT.REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const isUser = await prisma.user.findUnique({
    where: {
      email: verifiedRefreshToken.email,
    },
  });

  if (!isUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }

  if (
    isUser.status === UserStatus.BLOCKED ||
    isUser.status === UserStatus.INACTIVE
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account is blocked or inactive"
    );
  }
  if (isUser.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, "Your account is deleted");
  }

  const tokenPayload = {
    email: isUser.email,
    role: isUser.role,
    id: isUser.id,
  };

  const accessToken = generateToken(
    tokenPayload,
    config.JWT.ACCESS_TOKEN_SECRET,
    config.JWT.ACCESS_TOKEN_EXPIRATION
  );

  return {
    accessToken,
  };
};