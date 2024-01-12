import { Router } from "express";
import { getCategoryById, getCategories } from "../../controllers/category";
const router = Router();

// Category routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

export default router;
