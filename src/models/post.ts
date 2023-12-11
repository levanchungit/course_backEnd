import { Comment, IComment } from "../interfaces/comment";
import { Document, model, Schema } from "mongoose";

/*********************TYPE & INTERFACE*****************************/
export type StatusPostType = "draft" | "pending" | "public" | "private";

export type IPost = {
  tittle: string;
  content: string;
  author: Schema.Types.ObjectId;
  cover_image: string;
  create_at: Date;
  update_at: Date;
  comments: IComment[];
  categories: string[];
  view: number;
  like: number;
  share: number;
  status: StatusPostType;
  publish_at: Date | null;
};

export type PostTypeModel = IPost & Document;

/*******************************SCHEMA*****************************/

const postSchema: Schema = new Schema({
  tittle: { type: String },
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
});

const Post = model<PostTypeModel>("Post", postSchema);

export default Post;
