import {
  createPost,
  deletePost,
  getPost,
  getPostsPopular,
} from "../../controllers/post";
import getPosts from "../../controllers/post/get_posts";

import { Router } from "express";
import { validateAuthor, validateToken } from "../../middleware/validate";

const router = Router();

const isUser = [validateToken];
const isAuthor = [validateAuthor];

router.get("/", getPosts);

router.get("/popular", getPostsPopular);

router.get("/:id", getPost);
router.delete("/delete_post/:id", isAuthor, deletePost);

// router.put("/get", isUser, updateSelfUser);
// router.post("/add_keyword_search", isUser, addSearchHistory);
// router.get("/get_keyword_search", isUser, getSearchHistory);
// router.put("/:id", isAdmin, updateUser);
// router.delete("/:id", isAdmin, deleteUser);

router.post("/create_post", isAuthor, createPost);

export default router;
