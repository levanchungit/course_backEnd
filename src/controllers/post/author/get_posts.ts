import { Request, Response } from "express";
import Post from "../../../models/post";
import Category from "models/category";
import Log from "libraries/log";

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortDirection = (req.query.sort as string) || "asc";
    const startIndex = (page - 1) * limit;
    const total = await Post.countDocuments();

    let sortQuery = {};
    if (sortDirection === "asc") {
      sortQuery = { create_at: 1 };
    } else if (sortDirection === "desc") {
      sortQuery = { create_at: -1 };
    }

    const posts = await Post.find()
      .sort(sortQuery)
      .limit(limit)
      .skip(startIndex)
      .populate("categories")
      .lean();

    const postsWithCategoryNames = await Promise.all(
      posts.map(async (post) => {
        const categories = await Category.find({
          _id: { $in: post.categories },
        });
        const categoryNames = categories.map((category) => category.name);

        return {
          ...post,
          category_names: categoryNames,
        };
      })
    );

    const results = {
      total: total,
      page: page,
      limit: limit,
      results: postsWithCategoryNames,
    };

    return res.json(results);
  } catch (err) {
    Log.error(err);
    return res.sendStatus(500);
  }
};

export default getPosts;
