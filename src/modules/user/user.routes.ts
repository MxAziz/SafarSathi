import express from "express";
import { UserController } from "./user.controller.js";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest.js";
import { createTravelerZodSchema } from "./user.zod.validation.js";


const userRoute = express.Router();

userRoute.post(
  "/register",
  zodValidateRequest(createTravelerZodSchema),
  UserController.register
);

userRoute.get("/", UserController.getAllTravelers);

export default userRoute;