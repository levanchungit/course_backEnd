import { Request, Response } from "express";
import Post, { IPost } from "../../models/post";
import { Document } from "mongoose";

const createPost = async (req: Request, res: Response) => {
  try {
    const {
      tittle,
      content,
      cover_image,
      author,
      categories,
      publish_at,
      status,
    }: IPost = req.body;
    const post: IPost & Document = new Post({
      tittle,
      content,
      cover_image,
      author,
      categories,
      publish_at,
      status,
    });

    await post.save();
    return res.status(201).json({ id: post._id });
  } catch (err) {
    res.json({ message: err });
  }
};
export default createPost;
