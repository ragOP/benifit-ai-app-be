const Conversation = require("../../models/chat/conversation/index.js");
const User = require("../../models/user/index.js");
exports.createConversation = async (userId, adminId) => {
  let conversation = await Conversation.findOne({
    participants: { $all: [userId, adminId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [userId, adminId],
    });
  }
  console.log(conversation);
  await User.findOneAndUpdate(
    { _id: userId },
    { conversationId: conversation._id },
    { new: true }
  );

  return {
    success: true,
    statusCode: 200,
    data: conversation,
    message: "Conversation Created Successfully",
  };
};
