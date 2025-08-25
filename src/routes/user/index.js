const express = require("express");
const {
  handleResponse,
  handleQualifiedUser,
  handleAllRecords,
} = require("../../controller/user");

const Router = express.Router();

Router.route("/response").post(handleResponse);
Router.route("/qualified-user").get(handleQualifiedUser);
Router.route("/show-all-records").post(handleAllRecords);

module.exports = Router;
