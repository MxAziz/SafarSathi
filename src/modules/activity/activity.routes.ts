import express from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ActivityController } from "./activity.controller.js";
import { UserRole } from "../../../generated/prisma/browser.js";

const activityRoute = express.Router();

activityRoute.get(
  "/",
  checkAuth(UserRole.ADMIN),
  ActivityController.getSystemActivities
);

export default activityRoute;