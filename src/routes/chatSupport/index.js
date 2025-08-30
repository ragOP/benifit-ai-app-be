const express = require("express");
const {
  handleCreateChat,
  handleMessages,
} = require("../../controller/chatSupport/index.js");

const Router = express.Router();

Router.route("/create-chat").post(handleCreateChat);
Router.route("/send-message").post(handleMessages);

module.exports = Router;
