import bcrypt from "bcryptjs";
import type { ITraveler } from "./user.interface.js";
import config from "../../config/index.js";
import { prisma } from "../../lib/prisma.js";
import { UserRole } from "../../../generated/prisma/client.js";



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



export const UserService = {
  register,
};