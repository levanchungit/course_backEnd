import { Router } from "express";
import { validateAuthor } from "../../../middleware/validate";
import autoInsertVideosYoutube from "controllers/video/auto_insert_videos_youtube";

const router = Router();

const isAuthor = [validateAuthor];
router.get("/autoInsertVideosYoutube",isAuthor, autoInsertVideosYoutube);


export default router;
