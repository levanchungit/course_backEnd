import { Request, Response } from "express";
import Course from "../../../models/course";

const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.sendStatus(403);

    await Course.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default deleteCourse;
