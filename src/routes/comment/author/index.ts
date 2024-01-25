import { Router } from "express";
import { updateComment } from "controllers/comment";
const router = Router();

router.put("/:id", updateComment);

export default router;
