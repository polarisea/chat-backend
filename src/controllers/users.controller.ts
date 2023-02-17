import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { generateToken } from "../servives/jwt";
import User from "../models/User.model";

import type { ITokenRequest } from "../types/requests";

const handleRegister = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400);
      throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await User.create({
      email,
      name,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
        token: generateToken({ id: newUser._id }),
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the user");
    }
  }
);

const handleAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken({ id: user._id }),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  }
);

const handleUpdatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, newPassword } = req.body;

    if (!email || !password || !newPassword) {
      res.status(400);
      throw new Error("Please enter all the fields");
    }

    const user = await User.findOne({ email });
    if (user && user.matchPassword(password)) {
      user.password = newPassword;
      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  }
);

const allUsers = asyncHandler(
  async (req: ITokenRequest, res: Response, next: NextFunction) => {
    const keyword = req.query.search
      ? {
          $or: [
            { email: { $regex: req.query.search, $options: "i" } },
            { name: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    console.log(req.user);
    if (req.user) {
      const users = await User.find(keyword).find({
        _id: { $ne: req.user._id },
      });
      res.send(users);
    }
  }
);

export { handleRegister, handleAuth, handleUpdatePassword, allUsers };
