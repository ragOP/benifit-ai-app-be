const express = require("express");
const {
  handleResponse,
  handleQualifiedUser,
  handleAllRecords,
  handleAbandonedClaim,
  handleUserOffers,
  handleGetAllUsers,
} = require("../../controller/user");

const router = express.Router();

router.route("/response").post(handleResponse);
router.route("/qualified-user").get(handleQualifiedUser);
router.route("/show-all-records").post(handleAllRecords);
router.route("/abandoned-claim").post(handleAbandonedClaim);
router.route('/get-all-user').get(handleGetAllUsers);

module.exports = router;
