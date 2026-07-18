import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

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
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

/*
|------------------------------------------------------------------------
Routes
|------------------------------------------------------------------------
*/

app.get("/api/v1/health", (_, res) => {
  res.status(200).json({ message: "Welcome to the WeekBite API!" });
});


export default app;