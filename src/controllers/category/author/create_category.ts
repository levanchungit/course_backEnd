import { Request, Response } from "express";
import Category, { ICategory } from "../../../models/category";
import User from "../../../models/user";
import { getNow } from "../../../utils/common";
import { getIdFromReq } from "../../../utils/token";

const createCategory = async (req: Request, res: Response) => {
  try {
    const user_id = getIdFromReq(req);
    const user = await User.findById(user_id);
    const { name, note }: ICategory = req.body;

    if (!user) return res.sendStatus(403);
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(409)
        .json({ message: `Category name '${name}' already exists` });
    }

    //validate
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = new Category({
      name,
      note,
      create_at: getNow(),
      update_at: getNow(),
    });
    await category.save();
    return res.status(201).json({ id: category._id });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default createCategory;
