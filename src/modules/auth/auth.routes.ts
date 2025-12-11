import express from 'express';
import { AuthController } from './auth.controller.js';

const authRoute = express.Router();

authRoute.post("/login", AuthController.login);

export default authRoute;