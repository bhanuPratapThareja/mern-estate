import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();
const app = express();
const __dirname = path.resolve()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

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
      process.env.PORT || 5000,
      console.log(`Server is running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.log('Error connect to DB ', err));
