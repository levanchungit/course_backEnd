import { ObjectId } from "mongodb";
import { Document, model, Schema } from "mongoose";

/*********************TYPE & INTERFACE*****************************/
export type StatusCommentType = "private" | "public";
export type TypeCommentType = "contribute" | "comment";

export type IComment = {
  _id: ObjectId;
  postId: ObjectId;
  name: string;
  email: string;
  content: string;
  create_at: Date;
  update_at: Date;
  ipAddress: string;
  favorites: boolean;
  status: StatusCommentType;
  type: TypeCommentType;
  save(): unknown; //import không nó lỗi ts lúc save
};

export type CommentTypeModel = IComment & Document;

/*******************************SCHEMA*****************************/

const commentSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  name: { type: String },
  email: { type: String },
  content: { type: String },
  create_at: { type: Date },
  update_at: { type: Date },
  ipAddress: { type: String, default: "" },
  status: { type: String, default: "public" },
  favorites: { type: Boolean, default: false },
  type: { type: String, default: "comment" },
});

commentSchema.index({ content: "text" });

const Comment = model<CommentTypeModel>("Comment", commentSchema);

export default Comment;
