import { createPost, deletePost, getPost } from "../../../controllers/post";
import getPosts from "../../../controllers/post/author/get_posts";

import { Router } from "express";
import { validateAuthor, validateToken } from "../../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

router.get("/", isAuthor, getPosts);
router.get("/:id", isAuthor, getPost);
router.delete("/delete_post/:id", isAuthor, deletePost);
router.post("/create_post", isAuthor, createPost);

export default router;
