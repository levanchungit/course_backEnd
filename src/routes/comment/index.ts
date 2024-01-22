import { Router } from "express";
import { createComment } from "controllers/comment";
const router = Router();

// Category routes
router.post("/", createComment);

export default router;
