import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose from "mongoose";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User Name or Email ID already exists!"));
    }
  } catch (error) {
    return next(error);
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .status(201)
      .json({
        message: "User Created Successfully!",
      });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const passwordsMatch = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    if (!passwordsMatch) {
      return next(errorHandler(401, "Invalid credentials!"));
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    const userWithId = existingUser.toObject({ getters: true })
    const { password: pass, ...userInfo } = userWithId

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ user: userInfo });
  } catch (error) {
    return next(error);
  }
};
