import { Request, Response } from "express";
import { ICourse } from "../../../models/course";
import Course from "../../../models/course";

const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.sendStatus(403);

    const {
      title,
      content,
      author,
      cover_image,
      items,
      category,
      status,
      description,
    }: ICourse = req.body;

    //validate have update
    if (
      !title &&
      !content &&
      !cover_image &&
      !author &&
      !items &&
      !category &&
      !status &&
      !description
    ) {
      return res.status(400).json({ message: "No field to update" });
    }

    //validate
    if (title) {
      course.title = title;
    }
    if (content) {
      course.content = content;
    }
    if (cover_image) {
      course.cover_image = cover_image;
    }
    if (author) {
      course.author = author;
    }
    if (items) {
      course.items = items;
    }
    if (category) {
      course.category = category;
    }
    if (status) {
      course.status = status;
    }
    if (description) {
      course.description = description;
    }

    course.update_at = new Date();

    await course.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default updateCourse;
