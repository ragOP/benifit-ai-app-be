const express = require("express");
const {
  sendNotificationtoAllUsers,
  sendNotificationToIosUser
} = require("../../controller/send_notification");
const router = express.Router();

router.post("/send-notification", sendNotificationtoAllUsers);
router.post("/send-notification-ios", sendNotificationToIosUser)

module.exports = router;
