import { getPost, getPostsPopular } from "../../controllers/post";
import getPosts from "../../controllers/post/get_posts";

import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", getPost);
router.get("/popular", getPostsPopular);

export default router;
