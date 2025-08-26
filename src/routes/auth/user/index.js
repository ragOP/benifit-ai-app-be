const express = require("express");

const {
  handleRegister,
  handleLogin,
  handleGoogleLogin,
} = require("../../../controller/auth/index.js");

const Router = express.Router();

Router.route("/register").post(handleRegister);
Router.route("/login").post(handleLogin);
Router.route("/google-login").post(handleGoogleLogin);

module.exports = Router;
