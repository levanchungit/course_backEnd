import { Request, Response } from "express";
import Course from "../../../models/course";
import Category from "models/category";

const getCourses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortDirection = (req.query.sort as string) || "asc";
    const startIndex = (page - 1) * limit;
    const total = await Course.countDocuments();

    let sortQuery = {};
    if (sortDirection === "asc") {
      sortQuery = { create_at: 1 };
    } else if (sortDirection === "desc") {
      sortQuery = { create_at: -1 };
    }

    const courses = await Course.find()
      .sort(sortQuery)
      .limit(limit)
      .skip(startIndex)
      .lean();

    const coursesWithCategoryName = await Promise.all(
      courses.map(async (course) => {
        const categories = await Category.find({
          _id: course.category,
        });
        const categoryName = categories.map((category) => category.name);

        return {
          ...course,
          category_name: categoryName,
        };
      })
    );

    const results = {
      total: total,
      page: page,
      limit: limit,
      results: coursesWithCategoryName,
    };

    return res.json(results);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default getCourses;
