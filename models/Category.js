//create a new model tags
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Category", CategorySchema);
