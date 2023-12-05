import { login, logout, refreshToken } from "controllers/auth";
import { Router } from "express";
import { validateToken } from "middleware/validate";

const router = Router();

// Auth routes
router.post("/login", login);
router.get("/logout", validateToken, logout);
router.post("/refresh_token", refreshToken);

export default router;
