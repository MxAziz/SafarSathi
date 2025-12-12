import express from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { PaymentController } from "./payment.controller.js";
import { UserRole } from "../../../generated/prisma/enums.js";

const paymentRoute = express.Router();

// Create Payment Session
paymentRoute.post(
  "/subscribe",
  // auth(UserRole.TRAVELER), // আপনার auth middleware থাকলে ইউজ করবেন
  checkAuth(UserRole.TRAVELER),
  PaymentController.createSubscription
);

export default paymentRoute;