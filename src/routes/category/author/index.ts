import { Router } from "express";
import { getCategoriesAdmin } from "../../../controllers/category";
import { validateAuthor } from "../../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

// Category routes
router.get("/", isAuthor, getCategoriesAdmin);

export default router;
