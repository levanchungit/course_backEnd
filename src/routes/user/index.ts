import { deleteUser, getAuthor, getUsers } from "controllers/user";
import getUserById from "controllers/user/get_user";
import { Router } from "express";
import { validateAdmin, validateToken } from "middleware/validate";

const router = Router();

const isAdmin = [validateAdmin];
const isUser = [validateToken];

router.get("/author", getAuthor);
router.get("/", isAdmin, getUsers);
router.get("/get/:id", isAdmin, getUserById);
router.delete("/:id", isAdmin, deleteUser);

export default router;
