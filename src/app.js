import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
// app.use(cors());
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
    // optionsSuccessStatus: 200,
    // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    // exposedHeaders: ["Authorization"]
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
