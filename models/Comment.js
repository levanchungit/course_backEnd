//create a model comments post
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  content: String,
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  email: String,
  author: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
