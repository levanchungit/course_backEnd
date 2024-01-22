import { Router } from "express";
import { validateAuthor } from "../../../middleware/validate";
import { deleteUser, getMe, getUsers, updateMe } from "controllers/user";
import getUserById from "controllers/user/author/get_user";

const router = Router();

const isAuthor = [validateAuthor];

router.get("/", isAuthor, getUsers);
router.get("/me", isAuthor, getMe);
router.put("/me", isAuthor, updateMe);
router.get("/:id", isAuthor, getUserById);
router.delete("/:id", isAuthor, deleteUser);

export default router;
