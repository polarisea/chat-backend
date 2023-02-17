import { Router } from "express";

import { validateToken } from "../middlewares/auth.middleware";

import {
  handleRegister,
  handleAuth,
  handleUpdatePassword,
  allUsers,
} from "../controllers/users.controller";
const router = Router();

router.post("/register", handleRegister);
router.post("/auth", handleAuth);
router.post("/password/update", handleUpdatePassword);

router.get("", validateToken, allUsers);
export { router as usersApi };
