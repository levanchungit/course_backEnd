import { Comment, IComment } from "../interfaces/comment";
import { Document, model, Schema } from "mongoose";
import slugify from "slugify";
/*********************TYPE & INTERFACE*****************************/
export type StatusPostType = "draft" | "pending" | "public" | "private";

export type IPost = {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  cover_image: string;
  create_at: Date;
  update_at: Date;
  comments: IComment[];
  categories: string[];
  category_names: string[];
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
  title: { type: String },
  content: { type: String },
  author: { type: Schema.Types.ObjectId },
  cover_image: { type: String },
  create_at: { type: Date },
  update_at: { type: Date },
  comments: { type: [Comment], default: [] },
  categories: { type: [String], default: [] },
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  share: { type: Number, default: 0 },
  status: { type: String, default: "draft" },
  publish_at: { type: Date, default: null },
  slug: { type: String },
  note: { type: String },
});

postSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

const Post = model<PostTypeModel>("Post", postSchema);

export default Post;
