const express = require("express");
const {
  sendNotificationtoAllUsers,
} = require("../../controller/send_notification");
const router = express.Router();

router.post("/send-notification", sendNotificationtoAllUsers);

module.exports = router;
