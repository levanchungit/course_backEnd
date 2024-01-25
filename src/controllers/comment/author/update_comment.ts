import { Request, Response } from "express";
import { getNow } from "../../../utils/common";
import Comment from "models/comment";

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (!comment) return res.sendStatus(403);

    const { status, favorites } = req.body;

    comment.status = status;
    comment.favorites = favorites;

    comment.update_at = new Date(getNow());

    await comment.save();
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default update;
