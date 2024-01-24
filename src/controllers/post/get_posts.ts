import { Request, Response } from "express";
import Post from "../../models/post";
import Category from "models/category";
import Log from "libraries/log";

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortDirection = (req.query.sort as string) || "asc";
    const key = (req.query.key as string) || "";
    const startIndex = (page - 1) * limit;

    let sortQuery = {};
    if (sortDirection === "asc") {
      sortQuery = { create_at: 1 };
    } else if (sortDirection === "desc") {
      sortQuery = { create_at: -1 };
    }

    // Lấy danh sách ObjectID tương ứng với categories.name từ collection 'categories'
    const categoryIds = await Category.find({
      name: { $regex: key, $options: "i" },
    }).distinct("_id");

    const posts = await Post.find({
      status: "published",
      $or: [
        { title: { $regex: key, $options: "i" } }, // Tìm kiếm tương đối trong 'title'
        { categories: { $in: categoryIds } }, // Tìm kiếm theo categories._id
      ],
    })
      .sort(sortQuery)
      .limit(limit)
      .skip(startIndex)
      .populate({
        path: "categories",
        select: "-_id -update_at -create_at -note -__v",
      })
      .lean()
      .select("-_id -update_at -__v -status -note -author");

    const total = posts.length;

    const results = {
      total: total,
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

export default getPosts;
