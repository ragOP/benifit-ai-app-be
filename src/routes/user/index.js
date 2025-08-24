const express = require("express");
const {
  handleResponse,
  handleSingleRecord,
  handleAllRecords,
} = require("../../controller/user");

const Router = express.Router();

Router.route("/response").post(handleResponse);
Router.route("/show-single-record").get(handleSingleRecord);
Router.route("/show-all-records").post(handleAllRecords);

module.exports = Router;
