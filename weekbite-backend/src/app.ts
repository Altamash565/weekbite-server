import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";


import { env } from "./config/env";
import { authRoutes } from "./modules/auth";
import {notFound} from "./middleware/notFound.middleware";
import {errorHandler} from "./middleware/error.middleware";
import { HTTP_STATUS } from "./constants/http";

const app = express();

/*
|------------------------------------------------------------------------
Global Middlewares
|------------------------------------------------------------------------
*/

//security headers
app.use(helmet());

//parse JSON requests bodies
app.use(express.json());

//parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

//parse cookies
app.use(cookieParser());

//Allow frontend requests from different origins
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);


/*
|------------------------------------------------------------------------
Routes
|------------------------------------------------------------------------
*/

app.get("/api/v1/health", (_, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true, 
    message: "Welcome to the WeekBite API!" });
});

app.use("/api/v1/auth", authRoutes)

// Must come AFTER all routes
app.use(notFound);

// Must be the LAST middleware
app.use(errorHandler);

export default app;