import {
  create,
  update,
  deleteCourse,
  gets,
  get,
  getPlayLists,
} from "../../../controllers/course";

import { Router } from "express";
import { validateAuthor } from "../../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

router.get("/", isAuthor, gets);
router.get("/playLists", isAuthor, getPlayLists);
router.get("/:id", isAuthor, get);
router.post("/", isAuthor, create);
router.put("/:id", isAuthor, update);
router.delete("/delete_course/:id", isAuthor, deleteCourse);

export default router;
