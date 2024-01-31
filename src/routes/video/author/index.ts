import { Router } from "express";
import { validateAuthor } from "../../../middleware/validate";
import autoInsertVideosYoutube from "controllers/video/author/auto_insert_videos_youtube";
import { getVideoAuthor, getVideosAuthor } from "controllers/video";

const router = Router();

const isAuthor = [validateAuthor];
router.get("/", isAuthor, getVideosAuthor);
router.get("/autoInsertVideosYoutube", isAuthor, autoInsertVideosYoutube);
router.get("/:id", isAuthor, getVideoAuthor);

export default router;
