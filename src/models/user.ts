import { ROLE } from "../constants/user";
import { Author, IAuthor } from "../interfaces/author";
import { Schema, model, Document } from "mongoose";

/*********************TYPE & INTERFACE*****************************/

export type IUser = {
  email: string;
  passwordHash: string;
  access_token: string;
  refresh_token: string;
  role: ROLE;
  created_at: Date;
  update_at: Date;
  device_id: string;
  last_login: Date;
  author: IAuthor | null;
};

export type UserTypeModel = IUser & Document;

/*******************************SCHEMA*****************************/

export const userSchema = new Schema({
  email: { type: String, unique: true },
  passwordHash: { type: String },
  access_token: { type: String },
  refresh_token: { type: String },
  role: { type: String, enum: ROLE, default: ROLE.user },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  device_id: { type: String },
  last_login: { type: Date },
  author: { type: Author, default: null },
});

const User = model<UserTypeModel>("User", userSchema);

export default User;
