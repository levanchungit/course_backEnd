import { Request, Response } from "express";
import Course, { ICourse } from "../../../models/course";

const getCourse = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const course: ICourse | null = await Course.findById(_id);
    const result = {
      result: course,
    };

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default getCourse;
