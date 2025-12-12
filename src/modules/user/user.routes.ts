import express from "express";
import { UserController } from "./user.controller.js";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest.js";
import { createTravelerZodSchema, updateTravelerProfileZodSchema } from "./user.zod.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../../../generated/prisma/client.js";


const userRoute = express.Router();

// api/v1/users

userRoute.post(
  "/register",
  zodValidateRequest(createTravelerZodSchema),
  UserController.register
);

userRoute.patch(
  "/update-my-profile",
  checkAuth(UserRole.TRAVELER, UserRole.ADMIN),
  //me
  // multerUpload.single("file"),
  zodValidateRequest(updateTravelerProfileZodSchema),
  UserController.updateMyProfile
);

userRoute.get("/", UserController.getAllTravelers);

userRoute.get(
  "/me",
  checkAuth(UserRole.ADMIN, UserRole.TRAVELER),
  UserController.getMyProfile
);

userRoute.get("/:id", UserController.getTravelerById);

export default userRoute;