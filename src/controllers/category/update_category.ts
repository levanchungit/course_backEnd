import { Request, Response } from "express";
import Category, { ICategory } from "../../models/category";
import User from "../../models/user";
import { getNow, validateFields } from "../../utils/common";
import { getIdFromReq } from "../../utils/token";

const updateCategory = async (req: Request, res: Response) => {
  try {
    const id_user = getIdFromReq(req);
    const { id } = req.params;
    const user = await User.findById(id_user);
    const { name }: ICategory = req.body;
    const category = await Category.findById(id);

    if (!category) return res.sendStatus(404);
    if (!user) return res.sendStatus(403);

    const validateFieldsResult = validateFields({ name }, [
      { name: "name", type: "string", required: true },
    ]);
    if (validateFieldsResult)
      return res.status(400).json({ message: validateFieldsResult });

    const existingCategory = await Category.findOne({ name });
    if (existingCategory && existingCategory._id !== category._id) {
      return res
        .status(409)
        .json({ message: `Category name '${name}' already exists` });
    }

    const fieldsEdited = [];
    if (name !== category.name) fieldsEdited.push("name");

    if (!fieldsEdited.length) return res.sendStatus(304);

    const newCategory: ICategory = {
      ...category.toObject(),
      name: name ?? category.name,
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
