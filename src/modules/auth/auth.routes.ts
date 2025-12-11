import express from 'express';
import { AuthController } from './auth.controller.js';

const authRoute = express.Router();

authRoute.get("/me", AuthController.getMe);
authRoute.post("/login", AuthController.login);
authRoute.post("/refresh-token", AuthController.refreshToken);

export default authRoute;