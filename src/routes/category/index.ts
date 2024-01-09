import { Router } from "express";
import {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../controllers/category";
import { validateAuthor } from "../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

// Category routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", isAuthor, createCategory);
router.put("/:id", isAuthor, updateCategory);
router.delete("/:id", isAuthor, deleteCategory);

export default router;
