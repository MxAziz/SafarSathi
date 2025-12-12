import type { Prisma } from "../../../generated/prisma/client.js";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import type { IJwtPayload } from "../../types/common.js";
import { calculatePagination, type TOptions } from "../../utils/paginationHelpers.js";
import type { ITravelPlan } from "./travelPlans.interface.js";
import httpStatus from 'http-status';


const createTravelPlan = async (plan: ITravelPlan, travelerEmail: string) => {
  // Step 1: find the traveler using email
  const traveler = await prisma.traveler.findUnique({
    where: { email: travelerEmail },
  });

  if (!traveler) {
    throw new AppError(404, "Traveler profile not found");
  }

  // Step 2: Check profile completeness
  const isProfileComplete =
    traveler.contactNumber &&
    traveler.address &&
    traveler.profileImage &&
    traveler.bio &&
    traveler.currentLocation &&
    traveler.travelInterests.length > 0 &&
    traveler.visitedCountries.length > 0;

  if (!isProfileComplete) {
    throw new AppError(
      400,
      "Please complete your traveler profile before creating a travel plan"
    );
  }

  // Step 3: Create the travel plan
  const result = await prisma.travelPlan.create({
    data: {
      ...plan,
      travelerId: traveler.id,
    },
  });

  return result;
};

const getMyTravelPlans = async (user: IJwtPayload, options: TOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const traveler = await prisma.traveler.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!traveler) {
    throw new AppError(httpStatus.NOT_FOUND, "Traveler profile not found");
  }

  const whereConditions: Prisma.TravelPlanWhereInput = {
    travelerId: traveler.id, // Relation Field
  };

  const result = await prisma.travelPlan.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.travelPlan.count({ where: whereConditions });

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



const getTravelPlanById = async (id: string) => {
  const result = await prisma.travelPlan.findUniqueOrThrow({
    where: { id },
    include: {
      traveler: {
        select: {
          id: true,
          name: true,
          email: true,
          averageRating: true,
        },
      },
    },
  });
  return result;
};

export const TravelService = {
  createTravelPlan,
  getMyTravelPlans,
  getTravelPlanById,
}