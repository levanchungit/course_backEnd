import { Request, Response } from "express";
import Post from "models/post";

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.sendStatus(403);

    await Post.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default deletePost;
