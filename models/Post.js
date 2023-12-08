//create a new model Post
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: String,
  content: String,
  backgroundImage: String,
  status: {
    type: String,
    default: "public",
    enum: ["public", "private", "draft"],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Post", PostSchema);
