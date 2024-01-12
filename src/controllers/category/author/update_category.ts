import { Request, Response } from "express";
import Category, { ICategory } from "../../../models/category";

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, note }: ICategory = req.body;
    const category = await Category.findById(id);

    if (!category) return res.sendStatus(404);

    const existingCategory = await Category.findOne({ name });
    if (
      existingCategory &&
      existingCategory._id.toString() != category._id.toString()
    ) {
      return res
        .status(409)
        .json({ message: `Category name '${name}' already exists` });
    }

    const fieldsEdited = [];
    if (name !== category.name) fieldsEdited.push("name");
    if (note !== category.note) fieldsEdited.push("note");

    if (!fieldsEdited.length) return res.sendStatus(304);

    const newCategory: ICategory = {
      ...category.toObject(),
      name: name ?? category.name,
      note: note ?? category.note,
      update_at: new Date(),
    };

    await category.set(newCategory).save();
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default updateCategory;
