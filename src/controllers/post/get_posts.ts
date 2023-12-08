import { Request, Response } from "express";
import Post, { IPost } from "models/post";

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as string) || "created_at";
    const startIndex = (page - 1) * limit;
    const total = await Post.countDocuments();

    const posts: IPost[] = await Post.find()
      .sort(sort)
      .limit(limit)
      .skip(startIndex);

    const results = {
      total: total,
      page: page,
      limit: limit,
      results: posts,
    };

    return res.json(results);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getPosts;
