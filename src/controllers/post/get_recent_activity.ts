import { Request, Response } from "express";
import Comment from "models/comment";

const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ status: "public", type: "comment" })
      .populate({
        path: "postId",
        select: "+name",
      })
      .lean()
      .select(
        "-_id -update_at -__v -status -note -author -ipAddress -type -email"
      )
      .limit(5);

    const results = {
      results: comments,
    };

    return res.json(results);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getRecentActivity;
