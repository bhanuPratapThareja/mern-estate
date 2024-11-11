import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from "express-validator";

import User from "../models/user.model.js";
import HttpError from "../utils/http-error.js";
import { errorHandler, getError } from "../utils/error.js";
import { issueAccessToken, issueRefreshToken, verifyRefreshToken } from '../utils/tokens.js'

export const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const error = getError(errors)
    console.log('got error: ', error)
    return next(new HttpError(error.msg, 422))
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(errorHandler(409, "User Name or Email ID already exists!"));
    }
  } catch (error) {
    return next(error);
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ 
    username, 
    email, 
    password: hashedPassword,
    provider: 'email'
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({
        status: 201,
        message: "User Created Successfully!",
      });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const error = getError(errors)
    return next(new HttpError(error.msg, 422))
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      return next(new HttpError('Could not find a user with the provided email Id.', 404))
    }

    const passwordsMatch = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    
    if (!passwordsMatch) {
      return next(new HttpError('Incorrect password', 401))
    }  

    const access_token = issueAccessToken(existingUser)
    const refresh_token = issueRefreshToken(existingUser)
    const { password: pass, ...userInfo } = existingUser.toObject({ getters: true })

    res
      .cookie("access_token", access_token).cookie("refresh_token", refresh_token)
      .status(200)
      .json({ user: userInfo });
  } catch (error) {
    return next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email })
    
    if(existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_ACCESS_TOKEN_SECRET);
      const { password: pass, ...userInfo } = existingUser.toObject({ getters: true })

      res
        .cookie("access_token", token)
        .status(200)
        .json({ user: userInfo });
    } else {
      const generatedPassword = uuidv4();
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

      const newUser = new User({
        username: req.body.displayName,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photoURL,
        provider: 'google'
      })

      try {
        await newUser.save()      
        const token = issueAccessToken(newUser)
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

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    res.status(200).json({ status: 200, message: 'User is logged out'})
  } catch (error) {
    next(error)
  }
}

export const getNewAccessToken = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token

    try {
      const user = await verifyRefreshToken(refreshToken)
      const access_token = issueAccessToken(user)
      console.log('access_token: ', access_token)
      res
        .cookie('access_token', access_token)
        .status(200)
        .json({ status: 200, message: 'ACCESS_TOKEN_REISSUED' })
    } catch (error) {
       return next(errorHandler(400, error))
    }
}