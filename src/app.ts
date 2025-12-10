
import express, { type Request, type Response } from 'express';
// import { prisma } from './lib/prisma.js';
import config from './config/index.js';
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.get('/', async (req: Request, res: Response) => {
   res.send({
    success: true,
    message: "Welcome to SafarSathi Server",
    environment: config.NODE_ENV,
  });
});

export default app;
