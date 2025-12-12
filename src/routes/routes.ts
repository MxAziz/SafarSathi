import { Router } from "express";
import userRoute from "../modules/user/user.routes.js";
import authRoute from "../modules/auth/auth.routes.js";
import travelPlanRoute from "../modules/travelPlans/travelPlans.routes.js";
import reviewRoute from "../modules/reviews/reviews.routes.js";
import tripRequestRoute from "../modules/tripRequest/tripRequest.routes.js";
import statsRoute from "../modules/stats/stats.routes.js";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", userRoute);
routes.use("/travel-plans", travelPlanRoute);
routes.use("/reviews", reviewRoute);
routes.use("/trip-requests", tripRequestRoute);
routes.use("/stats", statsRoute);

export default routes;