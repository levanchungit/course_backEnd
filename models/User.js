//create models mongodb user
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  password: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superAdmin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
