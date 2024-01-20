import { Request, Response } from "express";
import Post from "../../models/post";
import Log from "libraries/log";

const getPostsPopular = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort as string == "-1" ? -1 : 1;
    const startIndex = (page - 1) * limit;

    const posts = await Post.find({}, "title slug create_at -_id")
      .sort({ create_at: sort})
      .limit(limit)
      .skip(startIndex);

    const results = {
      total: posts.length,
      page: page,
      limit: limit,
      results: posts,
    };

    return res.json(results);
  } catch (err) {
    Log.error(err);
    return res.sendStatus(500);
  }
};

export default getPostsPopular;
