const express = require("express");

const {
  handleRegister,
  handleLogin,
} = require("../../../controller/auth/index.js");

const Router = express.Router();

Router.route("/Register").post(handleRegister);
Router.route("/Login").post(handleLogin);

module.exports = Router;
