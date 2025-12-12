import express from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { StatsController } from "./stats.controller.js";
import { UserRole } from "../../../generated/prisma/browser.js";

const statsRoute = express.Router();

statsRoute.get(
  "/dashboard/traveler",
  checkAuth(UserRole.TRAVELER),
  StatsController.getTravelerDashboardData
);

// Admin Dashboard (New Route)
statsRoute.get(
  "/dashboard/admin",
  checkAuth(UserRole.ADMIN),
  StatsController.getAdminDashboardData
);
export default statsRoute;