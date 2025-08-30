const express = require("express");
const {
  handleMessages,
  handleGetChatHistory,
  handleGetAllUser,
} = require("../../controller/chatSupport/index.js");

const Router = express.Router();

Router.route("/chat-history").get(handleGetChatHistory);
Router.route("/send-message").post(handleMessages);
Router.route("/get-user").post(handleGetAllUser);

module.exports = Router;
