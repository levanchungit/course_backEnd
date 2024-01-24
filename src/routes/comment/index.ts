import { Router } from "express";
import { createComment } from "controllers/comment";
const router = Router();

router.post("/", createComment);

export default router;
