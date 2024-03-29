import {
  create,
  update,
  deleteCourse,
  gets,
  get,
  createCourseOrUpdatePlayListYoutube,
} from "../../../controllers/course";

import { Router } from "express";
import { validateAuthor } from "../../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

router.get("/", isAuthor, gets);
router.get("/playLists", isAuthor, createCourseOrUpdatePlayListYoutube);
router.get("/:id", isAuthor, get);
router.post("/", isAuthor, create);
router.put("/:id", isAuthor, update);
router.delete("/:id", isAuthor, deleteCourse);

export default router;
