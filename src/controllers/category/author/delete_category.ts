import { Request, Response } from "express";
import Category from "../../../models/category";
import Log from "libraries/log";

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) return res.sendStatus(404);

    await Category.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    Log.error(err);
    return res.sendStatus(500);
  }
};

export default deleteCategory;
