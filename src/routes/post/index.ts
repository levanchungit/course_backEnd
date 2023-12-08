import { createPost, getPost } from "controllers/post";
import getPosts from "controllers/post/get_posts";

import { Router } from "express";
import {
  validateAdmin,
  validateAuthor,
  validateToken,
} from "middleware/validate";

const router = Router();

const isAdmin = [validateAdmin];
const isUser = [validateToken];
const isAuthor = [validateAuthor];

router.get("/", getPosts);
router.get("/:id", getPost);
// router.put("/get", isUser, updateSelfUser);
// router.post("/add_keyword_search", isUser, addSearchHistory);
// router.get("/get_keyword_search", isUser, getSearchHistory);
// router.put("/:id", isAdmin, updateUser);
// router.delete("/:id", isAdmin, deleteUser);

router.post("/create_post", isAuthor, createPost);

export default router;
