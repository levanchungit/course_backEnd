import { Request, Response } from "express";
import Post, { IPost } from "../../models/post";

const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    console.log(req.params);

    console.log(slug);

    const post: IPost | null = await Post.findOne({ slug: slug });
    const result = {
      result: post,
    };

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getPostBySlug;
