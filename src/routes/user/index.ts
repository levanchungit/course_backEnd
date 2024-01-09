import { deleteUser, getAuthor, getUsers } from "../../controllers/user";
import getUserById from "../../controllers/user/get_user";
import { Router } from "express";
import {
  validateAuthor,
  validateToken,
} from "../../middleware/validate";

const router = Router();

const isAuthor = [validateAuthor];

router.get("/author", getAuthor);
router.get("/", isAuthor, getUsers);
router.get("/get/:id", isAuthor, getUserById);
router.delete("/:id", isAuthor, deleteUser);

export default router;
