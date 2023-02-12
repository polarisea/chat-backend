import { Router } from "express";
import { handleRegister, handleLogin } from "../controllers/auth.controller";
const router = Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin)

export { router as authApi };
