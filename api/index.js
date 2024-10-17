import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({ statusCode, message })
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to DB Estate");
    app.listen(
      process.env.PORT,
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log('Error connect to DB ', err));
