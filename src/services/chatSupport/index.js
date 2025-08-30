const Conversation = require("../../models/chat/conversation/index.js");

exports.createConversation = async (userId, adminId) => {
  let conversation = await Conversation.findOne({
      participants: { $all: [userId, adminId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, adminId],
      });
    }

    return {
      success: true,
      statusCode: 200,
      data: conversation,
      message: "Conversation Created Successfully",
    };
};
