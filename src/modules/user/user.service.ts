import bcrypt from "bcryptjs";
import type { ITraveler } from "./user.interface.js";
import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import { UserRole } from "../../../generated/prisma/client.js";
import { calculatePagination, type TOptions } from "../../utils/paginationHelpers.js";
import type { Gender, Prisma } from "../../../generated/prisma/browser.js";
import type { IJwtPayload } from "../../types/common.js";



const register = async (payload: ITraveler) => {
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.BCRYPTSALTROUND)
  );

  const createTraveler = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
        role: UserRole.TRAVELER,
      },
    });
    const travelerData = await tnx.traveler.create({
      data: {
        name: payload.name,
        email: payload.email,
      },
    });

    return travelerData;
  });

  return createTraveler;
};

const getAllTravelers = async (filters: any, options: TOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, gender, ...filterData } = filters;
  const andConditions: Prisma.TravelerWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { bio: { contains: searchTerm, mode: "insensitive" } },
        { currentLocation: { contains: searchTerm, mode: "insensitive" } },
      ],
    } as any);
  }

  if (gender) {
    andConditions.push({
      user: {
        gender: {
          equals: gender as Gender,
        },
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.TravelerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.traveler.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      user: {
        select: {
          isDeleted: true,
          isVerified: true,
        },
      },
    },
  });

  const total = await prisma.traveler.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getTravelerById = async (id: string) => {
  const result = await prisma.traveler.findUnique({
    where: {
      id: id,
    },

    // include: { reviews: true }
  });
  return result;
};

const getMyProfile = async (user: IJwtPayload) => {
  if (!user?.email || !user?.role) {
    throw new Error("Invalid user token");
  }

  let profileData;

  switch (user.role) {
    case UserRole.ADMIN:
      profileData = await prisma.admin.findUnique({
        where: { email: user.email },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              needPasswordChange: true,
              role: true,
              status: true,
              gender: true,
            },
          },
        },
      });
      break;

    case UserRole.TRAVELER:
      profileData = await prisma.traveler.findUnique({
        where: { email: user.email },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              needPasswordChange: true,
              role: true,
              status: true,
              gender: true,
            },
          },
        },
      });
      break;

    default:
      throw new Error("Unauthorized user role");
  }

  if (!profileData) {
    throw new Error("Profile not found");
  }

  return profileData;
};

export const UserService = {
  register,
  getAllTravelers,
  getTravelerById,
};