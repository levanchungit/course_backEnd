import { checkToken, login, logout, refreshToken } from "../../controllers/auth";
import { Router } from "express";
import { validateToken } from "../../middleware/validate";

const router = Router();

// Auth routes
router.post("/login", login);
router.get("/logout", validateToken, logout);
router.post("/refresh_token", refreshToken);
router.post("/check_token", checkToken);

export default router;
