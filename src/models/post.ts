import { ObjectId } from "mongodb";
import { Document, model, Schema } from "mongoose";
import slugify from "slugify";
/*********************TYPE & INTERFACE*****************************/
export type StatusPostType =
  | "draft"
  | "scheduled"
  | "published"
  | "archived"
  | "deleted";

export type IPost = {
  _id: ObjectId;
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  cover_image: string;
  create_at: Date;
  update_at: Date;
  comments: Schema.Types.ObjectId[];
  statusComment: boolean;
  categories: string[];
  view: number;
  like: number;
  share: number;
  status: StatusPostType;
  publish_at: Date | null;
  slug: string;
  note: string;
};

export type PostTypeModel = IPost & Document;

/*******************************SCHEMA*****************************/

const postSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String },
  content: { type: String },
  author: { type: Schema.Types.ObjectId },
  cover_image: { type: String },
  create_at: { type: Date },
  update_at: { type: Date },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
  statusComment: { type: Boolean, default: true },
  categories: { type: [String], default: [], ref: "Category" },
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  share: { type: Number, default: 0 },
  status: { type: String, default: "draft" },
  publish_at: { type: Date, default: "" },
  slug: { type: String },
  note: { type: String },
});

postSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      remove: /[^a-zA-Z0-9]/g, // Chỉ giữ lại chữ cái và số
    });
  }
  next();
});

// Tạo text index cho các trường 'title' và 'content'. Dùng để search key tối ưu hoá hơn
postSchema.index({ title: "text", content: "text" });

const Post = model<PostTypeModel>("Post", postSchema);

export default Post;
