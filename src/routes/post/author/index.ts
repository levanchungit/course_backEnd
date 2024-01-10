import {
  createPostAuthor,
  updatePostAuthor,
  deletePostAuthor,
  getPostsAuthor,
  getPostAuthor,
} from "../../../controllers/post";

import { Router } from "express";
import { validateAuthor, validateToken } from "../../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

router.get("/", isAuthor, getPostsAuthor);
router.get("/:id", isAuthor, getPostAuthor);
router.post("/create_post", isAuthor, createPostAuthor);
router.put("/:id", isAuthor, updatePostAuthor);
router.delete("/delete_post/:id", isAuthor, deletePostAuthor);

export default router;
