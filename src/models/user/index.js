const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  fcmToken: {
    type: String,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    default: null,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
