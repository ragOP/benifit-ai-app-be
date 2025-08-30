const { ApiResponse } = require("../../utils/apiResponse/index.js");
const { ApiError } = require("../../utils/apiError/index.js");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const { createConversation } = require("../../services/chatSupport/index.js");
const Message = require("../../models/chat/message/index.js");
const Conversation = require("../../models/chat/conversation/index.js");

exports.handleCreateChat = asyncHandler(async (req, res) => {
  const { userId, adminId } = req.body;
  if (!userId) {
    new ApiResponse(400, null, "Enter User Id");
  }

  const result = await createConversation(userId, adminId);

  return res
    .status(200)
    .json(new ApiResponse(200, result.data, result.message));
});
exports.handleMessages = asyncHandler(async (req, res) => {
  const { text, userId, conversationId, adminId } = req.body;
  if (!userId) {
    new ApiResponse(400, null, "Enter valid details");
  }
  let conversation;
  if (!conversationId) {
    conversation = await createConversation(userId, adminId);
  }

  const result = await Message.create({ text, userId, conversationId });
  return res
    .status(200)
    .json(
      new ApiResponse(200, { result, conversation }, "message created success")
    );
});

exports.handleGetChatHistory = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await Conversation.findOne({ conversationId });
  if (!conversation) {
    new ApiResponse(400, null, "ConversationId Missing");
  }
  const message = await Message.find({ chatId: conversationId }).sort({
    createdAt: 1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, message, "message fetched successfully"));
});
exports.handleGetAllUser = asyncHandler(async (req, res) => {
  const result = await Conversation.find();
  return res
    .status(200)
    .json(new ApiResponse(200, result, "all user fetched successfully"));
});
