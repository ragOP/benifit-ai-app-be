const express = require("express");

const {
  handleRegister,
  handleLogin,
} = require("../../../controller/auth/index.js");

const Router = express.Router();

Router.route("/register").post(handleRegister);
Router.route("/login").post(handleLogin);

module.exports = Router;
