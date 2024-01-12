import { Router } from "express";
import { validateAuthor } from "../../../middleware/validate";
import {
  createCategoryAuthor,
  deleteCategoryAuthor,
  getCategoriesAuthor,
  getCategoryAuthor,
  updateCategoryAuthor,
} from "controllers/category";

const router = Router();

const isAuthor = [validateAuthor];

// Category routes
router.get("/", isAuthor, getCategoriesAuthor);
router.get("/:id", isAuthor, getCategoryAuthor);
router.post("/", isAuthor, createCategoryAuthor);
router.put("/:id", isAuthor, updateCategoryAuthor);
router.delete("/:id", isAuthor, deleteCategoryAuthor);

export default router;
