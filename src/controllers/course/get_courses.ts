import { Request, Response } from "express";
import Course from "../../models/course";
import Category from "../../models/category";
import Log from "libraries/log";

const getCourses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortDirection = (req.query.sort as string) || "asc";
    const startIndex = (page - 1) * limit;
    
    const total = await Course.countDocuments({ status: "public" });

    const sortQuery: Record<string, any> = { create_at: sortDirection === "asc" ? 1 : -1 };

    const courses = await Course.find({ status: "public" })
      .sort(sortQuery)
      .limit(limit)
      .skip(startIndex)
      .lean()
      .select("-_id -create_at -update_at -__v -status -author");

    const categoryIds = courses.map((course) => course.category);
    const categories = await Category.find({ _id: { $in: categoryIds } });

    const coursesWithCategoryName = courses.map((course) => {
      const categoryName = categories.find((category) =>
        category._id.equals(course.category)
      )?.name;

      return {
        ...course,
        category_name: categoryName,
      };
    });

    const results = {
      total,
      page,
      limit,
      results: coursesWithCategoryName,
    };

    return res.json(results);
  } catch (err) {
    Log.error(err);
    return res.sendStatus(500);
  }
};

export default getCourses;
