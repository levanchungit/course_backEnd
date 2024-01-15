import { Request, Response } from "express";
import Post, { IPost } from "../../../models/post";

const getPost = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const post: IPost | null = await Post.findById(_id);
    const result = {
      result: post,
    };

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getPost;
