import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

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

  try {
    const existingUser = await User.findOne({ email });
    
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
    console.log('existingUser:: ', existingUser)
    const { password: pass, __v, _id, ...userInfo } = existingUser.toObject({ getters: true })

    res
      .cookie("access_token", token)
      .status(200)
      .json({ user: userInfo });
  } catch (error) {
    console.log('signin error: ', error)
    return next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    
    if(existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...userInfo } = existingUser.toObject({ getters: true })

      res
        .cookie("access_token", token)
        .status(200)
        .json({ user: userInfo });
    } else {
      const generatedPassword = uuidv4();
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

      const newUser = new User({
        username: req.body.displayName.split(' ').join('') + '###' + uuidv4(),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photoURL
      })

      try {
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...userInfo } = newUser.toObject({ getters: true })

        res
          .cookie("access_token", token)
          .status(200)
          .json({ user: userInfo });
      } catch (error) {
        return next(error)
      }
    }
  } catch (error) {
    return next(error)
  }
}