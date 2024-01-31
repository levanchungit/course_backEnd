import { Document, model, Schema } from "mongoose";
import slugify from "slugify";
/*********************TYPE & INTERFACE*****************************/
export type StatusCourseType = "publish" | "private" | "delete";

export type ICourse = {
  title: string;
  author: Schema.Types.ObjectId;
  cover_image: string;
  create_at: Date;
  update_at: Date;
  items: [];
  category: string;
  category_name: string;
  status: StatusCourseType;
  slug: string;
  description: string;
  publish_at: Date;
};

export type CourseTypeModel = ICourse & Document;

/*******************************SCHEMA*****************************/

const courseSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  idPlaylist: { type: String },
  title: { type: String },
  author: { type: Schema.Types.ObjectId },
  cover_image: { type: String },
  create_at: { type: Date },
  update_at: { type: Date },
  items: { type: [], default: [] },
  category: { type: String },
  status: { type: String, default: "public" },
  slug: { type: String },
  description: { type: String },
  publish_at: { type: Date },
});

courseSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

const Course = model<CourseTypeModel>("Course", courseSchema);

export default Course;
