import { Document, model, Schema } from "mongoose";

/*********************TYPE & INTERFACE*****************************/

export type ICategory = {
  _id: string;
  name: string;
  created_at: Date;
  update_at: Date;
};

export type CategoryTypeModel = ICategory & Document;

/*******************************SCHEMA*****************************/

const categorySchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, require: true, unique: true },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const Category = model<CategoryTypeModel>("Category", categorySchema);

export default Category;
