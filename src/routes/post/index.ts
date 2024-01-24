import getPostBySlug from "controllers/post/get_post_slug";
import { getPost, getPostsPopular, getRecentActivity } from "../../controllers/post";
import getPosts from "../../controllers/post/get_posts";

import { Router } from "express";

const router = Router();

router.get("/", getPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/popular", getPostsPopular);
router.get("/recentActivity", getRecentActivity);
router.get("/:id", getPost);
router.put("/:id", getPost);

export default router;
