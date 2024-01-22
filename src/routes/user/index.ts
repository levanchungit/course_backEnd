import { getAuthor } from "../../controllers/user";
import { Router } from "express";

const router = Router();

router.get("/author", getAuthor);

export default router;
