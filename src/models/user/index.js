const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fcmToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
