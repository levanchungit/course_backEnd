import { getCourse } from "../../controllers/course";
import getCourses from "../../controllers/course/get_courses";

import { Router } from "express";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", getCourse);

export default router;
