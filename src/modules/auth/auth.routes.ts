import express from 'express';
import { AuthController } from './auth.controller.js';
import { checkAuth } from '../../middlewares/checkAuth.js';
import { UserRole } from '../../../generated/prisma/enums.js';

const authRoute = express.Router();

authRoute.get("/me", AuthController.getMe);
authRoute.post("/login", AuthController.login);
authRoute.post("/refresh-token", AuthController.refreshToken);
authRoute.post(
  "/change-password",
  checkAuth(UserRole.ADMIN),
  AuthController.changePassword
);

export default authRoute;