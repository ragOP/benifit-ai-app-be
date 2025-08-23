const express = require("express");
const {
  handleResponse,
  handleSingleRecord,
  handleAllRecords,
} = require("../../controller/user");

const Router = express.Router();

Router.route("/response").post(handleResponse);
Router.route("/showSingleRecord").get(handleSingleRecord);
Router.route("/showAllRecords").post(handleAllRecords);

module.exports = Router;
