import { getVideo, getVideos } from "controllers/video";
import { Router } from "express";

const router = Router();

router.get("/", getVideos);
router.get("/:id", getVideo);

export default router;
