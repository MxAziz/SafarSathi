import bcrypt from "bcryptjs";
import config from "../config/index.js";
import { prisma } from "../lib/prisma.js";

export async function seedAdmin() {
  try {
    const isAdminExists = await prisma.user.findUnique({
      where: {
        email: config.ADMIN_EMAIL,
        role: "ADMIN",
      },
    });
    if (isAdminExists) {
      console.log("Admin already exists");
      return;
    }
    const hashPassword = await bcrypt.hash(
      config.ADMIN_PASSWORD,
      Number(config.BCRYPTSALTROUND)
    );

    await prisma.$transaction(async (tnx) => {
      await tnx.user.create({
        data: {
          email: config.ADMIN_EMAIL,
          password: hashPassword,
          role: "ADMIN",
          isVerified: true,
          gender: "MALE",
        },
      });

      await tnx.admin.create({
        data: {
          name: "Muhammad Aziz",
          email: config.ADMIN_EMAIL,
          contactNumber: "01623568974",
          address: "Dhaka, Bangladesh",
          profileImage:
            "https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80",
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
}