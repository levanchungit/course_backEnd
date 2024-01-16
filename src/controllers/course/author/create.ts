import { Request, Response } from "express";
import Course, { ICourse } from "../../../models/course";
import { Document } from "mongoose";
import { getNow } from "utils/common";

const create = async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      cover_image,
      items,
      category,
      status,
      description,
    }: ICourse = req.body;
    const course: ICourse & Document = new Course({
      title,
      author,
      cover_image,
      create_at: getNow(),
      update_at: getNow(),
      items: items || [],
      category,
      status,
      description,
    });

    await course.save();
    return res.status(201).json({ id: course._id });
  } catch (err) {
    res.json({ message: err });
  }
};
export default create;
