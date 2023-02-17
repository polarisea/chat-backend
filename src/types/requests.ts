import { Request } from "express";
import { UserModel, IUser } from "../models/User.model";

export interface ITokenRequest extends Request {
  user?: IUser | null;
}
