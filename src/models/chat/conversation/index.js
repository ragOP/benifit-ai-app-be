const { mongoose, Schema } = require("mongoose");

const conversationSchema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("conversation", conversationSchema);
module.exports = Conversation;
