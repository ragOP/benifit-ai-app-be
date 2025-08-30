const { ApiResponse } = require("../../utils/apiResponse/index.js");
const { ApiError } = require("../../utils/apiError/index.js");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const { createConversation } = require("../../services/chatSupport/index.js");
const Message = require("../../models/chat/message/index.js");

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
  const { text, userId, conversationId } = req.body;
  if (!text || !userId || !conversationId) {
    new ApiResponse(400, null, "Enter valid details");
  }

  const result = await Message.create({ text, userId, conversationId });
  return res
    .status(200)
    .json(new ApiResponse(200, result, "message created success"));
});
