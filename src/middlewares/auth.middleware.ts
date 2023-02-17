import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import User from "../models/User.model";
import type { ITokenRequest } from "../types/requests";
import { vertifyToken } from "../servives/jwt";

const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decode = vertifyToken(token);
        (req as ITokenRequest).user = await User.findById(decode.id);
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
);

export { validateToken };
