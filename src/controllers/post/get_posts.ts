import { Request, Response } from "express";
import Post from "../../models/post";
import Category, { CategoryTypeModel } from "models/category";

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as string) || "created_at";
    const startIndex = (page - 1) * limit;
    const total = await Post.countDocuments();

    const posts = await Post.find()
      .sort(sort)
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
    console.error(err);
    return res.sendStatus(500);
  }
};

export default getPosts;
