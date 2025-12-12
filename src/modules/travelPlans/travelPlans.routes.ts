import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth.js';
import { UserRole } from '../../../generated/prisma/enums.js';
import { zodValidateRequest } from '../../middlewares/zodValidateRequest.js';
import { createTravelPlanZodSchema, updateTravelPlanZodSchema } from './travelPlans.zod.validation.js';
import { TravelController } from './travelPlans.controller.js';
import { multerUpload } from '../../config/multer.config.js';

const travelPlanRoute = express.Router();

travelPlanRoute.post(
  "/",
  checkAuth(UserRole.TRAVELER),
  multerUpload.single("file"),
  zodValidateRequest(createTravelPlanZodSchema),
  TravelController.createTravelPlan
);

travelPlanRoute.get("/", TravelController.getAllTravelPlans);

//get my travel plans
travelPlanRoute.get(
  "/my-plans",
  checkAuth(UserRole.TRAVELER),
  TravelController.getMyTravelPlans
);

travelPlanRoute.get(
  "/:id",
  // checkAuth(UserRole.TRAVELER, UserRole.ADMIN),
  TravelController.getTravelPlanById
);

travelPlanRoute.patch(
  "/:id",
  checkAuth(UserRole.TRAVELER),
  multerUpload.single("file"),
  zodValidateRequest(updateTravelPlanZodSchema),
  TravelController.updateTravelPlan
);

travelPlanRoute.delete(
  "/:id",
  checkAuth(UserRole.TRAVELER, UserRole.ADMIN),
  TravelController.deleteTravelPlan
);

export default travelPlanRoute;