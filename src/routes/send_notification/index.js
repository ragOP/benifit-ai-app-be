const express = require("express");
const { sendNotificationtoSingleUser, sendNotificationtoAllUsers } = require("../../controller/send_notification");
const router = express.Router();

router.post("/send-notification/:id", sendNotificationtoSingleUser);
router.post("/send-notification", sendNotificationtoAllUsers);

module.exports = router;