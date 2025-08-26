const express = require("express");
const {
  handleResponse,
  handleQualifiedUser,
  handleAllRecords,
  handleAbandonedClaim,
  handleUserOffers,
} = require("../../controller/user");

const Router = express.Router();

Router.route("/response").post(handleResponse);
Router.route("/qualified-user").get(handleQualifiedUser);
Router.route("/show-all-records").post(handleAllRecords);
Router.route("/abandoned-claim").post(handleAbandonedClaim);


module.exports = Router;
