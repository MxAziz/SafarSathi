
import express, { type Request, type Response } from 'express';
import config from './config/index.js';
import cookieParser from "cookie-parser";
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import notFound from './middlewares/notFound.js';
import routes from './routes/routes.js';

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1", routes);

app.get('/', async (req: Request, res: Response) => {
   res.send({
    success: true,
    message: "Welcome to SafarSathi Server",
    environment: config.NODE_ENV,
  });
});


app.use(globalErrorHandler);
app.use(notFound);

export default app;
