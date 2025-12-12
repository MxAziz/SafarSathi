import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth.js';
import { UserRole } from '../../../generated/prisma/enums.js';
import { zodValidateRequest } from '../../middlewares/zodValidateRequest.js';
import { createTravelPlanZodSchema } from './travelPlans.zod.validation.js';
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

//get my travel plans
travelPlanRoute.get(
  "/my-plans",
  checkAuth(UserRole.TRAVELER),
  TravelController.getMyTravelPlans
);

export default travelPlanRoute;