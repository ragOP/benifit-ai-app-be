const { ApiResponse } = require("../../utils/apiResponse/index.js");
const { ApiError } = require("../../utils/apiError/index.js");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const { createConversation } = require("../../services/chatSupport/index.js");
const Message = require("../../models/chat/message/index.js");
const Conversation = require("../../models/chat/conversation/index.js");
const User = require("../../models/user/index.js");
const mongoose = require("mongoose");

exports.handleMessages = asyncHandler(async (req, res) => {
  const { text, userId, conversationId, adminId, role = "User" } = req.body;

  if (!text || !userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Enter valid details"));
  }

  let conversation;

  if (conversationId) {
    if (mongoose.Types.ObjectId.isValid(conversationId)) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res
          .status(404)
          .json(new ApiResponse(404, null, "Conversation not found"));
      }
    } else {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid conversationId"));
    }
  }

  if (!conversation) {
    const newConv = await createConversation(userId, adminId);
    conversation = { _id: newConv.data._id };
  }

  const result = await Message.create({
    text,
    userId,
    conversationId: conversation._id,
    role,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      { result },
      "Message created successfully"
    )
  );
});

exports.handleGetChatHistory = asyncHandler(async (req, res) => {
  const { conversationId } = req.query;

  if (!conversationId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Conversation ID is required"));
  }

  const conversationExists = await Conversation.findById(conversationId);
  if (!conversationExists) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Conversation not found"));
  }

  const messages = await Message.find({ conversationId: conversationId })
    .sort({ createdAt: 1 })
    .populate("userId", "username email role");

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});
exports.handleGetAllUser = asyncHandler(async (req, res) => {
  const result = await Conversation.find().populate(
    "participants",
    "username email role"
  );
  console.log("result", result);
  return res
    .status(200)
    .json(new ApiResponse(200, result, "all user fetched successfully"));
});
