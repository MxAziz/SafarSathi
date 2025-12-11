import bcrypt from "bcryptjs";
import { UserStatus } from "../../../generated/prisma/enums.js";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { createUserTokens } from "../../utils/userToken.js";
import { generateToken, verifyToken } from "../../utils/jwt.js";
import config from "../../config/index.js";
import type { JwtPayload } from "jsonwebtoken";
import type { IJwtPayload } from "../../types/common.js";


const getMe = async (session: any) => {
  const accessToken = session.accessToken;
  const decodedData = verifyToken(
    accessToken,
    config.JWT.ACCESS_TOKEN_SECRET
  ) as JwtPayload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const { id, email, role, status } = userData;
  return {
    id,
    email,
    role,
    status,
  };
};

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

const changePassword = async (
  user: IJwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password as string
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(
    payload.newPassword,
    Number(config.BCRYPTSALTROUND)
  );

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      // needPasswordChange: false
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

export const AuthService = {
  getMe,
  login,
  refreshToken,
  changePassword,
}