import { Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import { Account } from "../models/Account.model";
import { genAccessToken, vertifyAccessToken } from "../servives/jwt";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const handleRegister = async (req: Request, res: Response) => {
  const account = await Account.findOne({ email: req.body.email });
  if (account) {
    return res.send({ succeed: false, message: "Register failed" });
  } else {
    const hashPassword = hashSync(req.body.password, SALT_ROUNDS);
    const newAccount = await Account.create({
      email: req.body.email,
      password: hashPassword,
      id: Date.now(),
    });
    await newAccount.save();
    return res.send({ succeed: true, message: "Account created successfully" });
  }
};

const handleLogin = async (req: Request, res: Response) => {
  const account = await Account.findOne({ email: req.body.email });
  if (account) { 
    if (account.password && compareSync(req.body.password, account.password)) {
      const accessToken = genAccessToken({email:account.email, name:account.name, id:account.id})
      return res.send({succeed:true, message:"Login succeedfuly", data:accessToken})
    } else {
    }
  } else{
    return res.send({succeed:false, message:"Login failed"})
  }
};

export { handleRegister, handleLogin };
