import { Request, Response } from "express";
import Post, { IPost } from "../../models/post";
import { Document } from "mongoose";
import { getNow } from "utils/common";

const createPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      cover_image,
      author,
      categories,
      publish_at,
      status,
      note
    }: IPost = req.body;
    const post: IPost & Document = new Post({
      title,
      content,
      cover_image,
      author,
      create_at: getNow(),
      update_at: null,
      comments: [],
      categories,
      publish_at,
      status,
      note
    });

    await post.save();
    return res.status(201).json({ id: post._id });
  } catch (err) {
    res.json({ message: err });
  }
};
export default createPost;
