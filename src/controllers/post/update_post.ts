import { Request, Response } from "express";
import { IPost } from "../../models/post";
import Post from "../../models/post";
import { getNow, validateFields } from "../../utils/common";

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.sendStatus(403);

    const {
      tittle,
      content,
      cover_image,
      author,
      categories,
      publish_at,
      status,
    }: IPost = req.body;

    const validateFieldsResult = validateFields(
      { tittle, content, cover_image, author, categories, publish_at, status },
      [
        { name: "tittle", type: "string", required: true },
        { name: "content", type: "string", required: true },
        { name: "cover_image", type: "string", required: true },
        { name: "author", type: "string", required: true },
        { name: "categories", type: "string", required: true },
        { name: "publish_at", type: "string", required: true },
        { name: "status", type: "string", required: true },
      ]
    );
    if (validateFieldsResult)
      return res.status(400).json({ message: validateFieldsResult });

    post.tittle = tittle;
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
