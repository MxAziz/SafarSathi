import express, {} from 'express';
import config from './config/index.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import notFound from './middlewares/notFound.js';
import routes from './routes/routes.js';
import { PaymentController } from './modules/payment/payment.controller.js';
const app = express();
app.post("/webhook", express.raw({ type: "application/json" }), PaymentController.stripeWebhook);
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["https://safarsathi-mu.vercel.app", "http://localhost:3000"],
    credentials: true,
}));
// routes
app.use("/api/v1", routes);
app.get('/', async (req, res) => {
    res.send({
        success: true,
        message: "Welcome to SafarSathi Server",
        environment: config.NODE_ENV,
    });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map