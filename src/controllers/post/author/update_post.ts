import { Request, Response } from "express";
import { IPost } from "../../../models/post";
import Post from "../../../models/post";
import { getNow } from "../../../utils/common";

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.sendStatus(403);

    const {
      title,
      content,
      cover_image,
      author,
      categories,
      publish_at,
      status,
    }: IPost = req.body;

    post.title = title;
    post.content = content;
    post.cover_image = cover_image;
    post.author = author;
    post.status = status;
    post.categories = categories;
    post.publish_at = publish_at;
    post.status = status;

    post.update_at = new Date();

    await post.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default updatePost;
