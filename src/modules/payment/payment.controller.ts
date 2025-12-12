import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import config from "../../config/index.js";
import { stripe } from "../../config/stripe.config.js";
import { PaymentService } from "./payment.service.js";
import type { IJwtPayload } from "../../types/common.js";

const createSubscription = catchAsync(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const travelerData = req.user as IJwtPayload;
    const result = await PaymentService.createSubscriptionSession(
      req.body,
      travelerData
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payment session created successfully",
      data: result,
    });
  }
);

// Webhook
const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = config.STRIPE.webhook_secret as string;

  let event;

  try {
    // req.body must be RAW buffer here
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    // Webhook error should return 400 to let Stripe know
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Service call
  await PaymentService.handleWebhook(event);

  // Return 200 to acknowledge receipt of the event
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Webhook received successfully",
    data: null,
  });
});

export const PaymentController = {
  createSubscription,
  stripeWebhook,
};