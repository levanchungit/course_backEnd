import { Request, Response } from "express";
import { IPost } from "../../../models/post";
import Post from "../../../models/post";

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
      note,
      statusComment,
    }: IPost = req.body;

    //validate have update
    if (
      !title &&
      !content &&
      !cover_image &&
      !author &&
      !categories &&
      !publish_at &&
      !status &&
      !note
    ) {
      return res.status(400).json({ message: "No field to update" });
    }

    //validate
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    if (cover_image) {
      post.cover_image = cover_image;
    }
    if (author) {
      post.author = author;
    }
    if (categories) {
      post.categories = categories;
    }
    if (publish_at) {
      post.publish_at = publish_at;
    }
    if (status) {
      post.status = status;
    }
    if (note) {
      post.note = note;
    }
    if (statusComment) {
    }

    post.statusComment = statusComment;
    post.update_at = new Date();

    await post.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default updatePost;
