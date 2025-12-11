import bcrypt from "bcryptjs";
import { UserStatus } from "../../../generated/prisma/enums.js";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { createUserTokens } from "../../utils/userToken.js";
import { generateToken, verifyToken } from "../../utils/jwt.js";
import config from "../../config/index.js";
import type { JwtPayload } from "jsonwebtoken";


const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError(403, "User is not active");
  }

  if (user.isDeleted) {
    throw new AppError(410, "User has been deleted");
  }
  // if (!user.isVerified) {
  //   throw new AppError(401, "User email is not verified");
  // }

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password as string
  );
  if (!isCorrectPassword) {
    throw new AppError(401, "Incorrect password");
  }

  const tokenPayload = {
    email: user.email,
    role: user.role,
    id: user.id,
  };

  const userTokens = createUserTokens(tokenPayload);

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const refreshToken = async (token: string)=> {
  let decodedData;
  try {
    decodedData = verifyToken(
      token,
      config.JWT.REFRESH_TOKEN_SECRET
    ) as JwtPayload;
  } catch (error) {
    throw new Error("You are not authorized!");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  if (userData.isDeleted === true) {
    throw new AppError(404, "Your account is deleted");
  }

  // if (userData.isVerified === false) {
  //   throw new AppError(404, "Your account is not verified");
  // }

  const tokenPayload = {
    email: userData.email,
    role: userData.role,
    id: userData.id,
  };
  const accessToken = generateToken(
    tokenPayload,
    config.JWT.ACCESS_TOKEN_SECRET,
    config.JWT.ACCESS_TOKEN_EXPIRATION
  );

  return {
    accessToken,
  };
}


export const AuthService = {
  login,
  refreshToken,
}