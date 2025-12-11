import { Router } from "express";
import userRoute from "../modules/user/user.routes.js";
import authRoute from "../modules/auth/auth.routes.js";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", userRoute);

export default routes;