import Stripe from "stripe";
import config from "./../config/index.js";

export const stripe = new Stripe(config.STRIPE.STRIPE_SECRET_KEY);