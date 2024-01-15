import { Document, model, Schema } from "mongoose";
/*********************TYPE & INTERFACE*****************************/
export type StatusPostType =
  | "draft"
  | "scheduled"
  | "published"
  | "archived"
  | "deleted";

export type IStatus = {
  name: StatusPostType;
  create_at: Date;
  update_at: Date;
  note: string;
};

export type PostTypeModel = IStatus & Document;

/*******************************SCHEMA*****************************/
const postSchema: Schema = new Schema({
  name: { type: String },
  create_at: { type: Date },
  update_at: { type: Date },
  note: { type: String },
});

const Post = model<PostTypeModel>("status", postSchema);

export default Post;
