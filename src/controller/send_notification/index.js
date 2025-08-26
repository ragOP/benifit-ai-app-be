const User = require("../../models/user");
const { ApiResponse } = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asynchandler");
const { sendPushNotification } = require("../../utils/send_notification");

exports.sendNotificationtoSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { notificationData } = req.body;
  const user = await User.findById(id);
  console.log("User found:", user);
  if (!user) {
    return res
      .status(200)
      .json(new ApiResponse(404, null, "User not found", false));
  }
  const fcmToken = user.fcmToken;
  const userId = user._id;
  console.log("Sending notification to:", userId, fcmToken);
  const response = await sendPushNotification(
    fcmToken,
    userId,
    notificationData
  );
  if (response.success) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, response, "Notification sent successfully", true)
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(500, response, "Failed to send notification", false)
      );
  }
});

exports.sendNotificationtoAllUsers = asyncHandler(async (req, res) => {
  const { notificationData, userIds } = req.body;
  const users = await User.find({ _id: { $in: userIds } });

  const results = [];
  let successCount = 0;
  let failureCount = 0;

  for (const user of users) {
    const response = await sendPushNotification(
      user.fcmToken,
      user._id,
      notificationData
    );

    results.push({
      userId: user._id,
      success: response.success,
      message: response.message,
      error: response.error || null,
    });

    if (response.success) {
      successCount++;
    } else {
      failureCount++;
    }
  }
  const overallSuccess = successCount > 0;
  const summary = {
    totalUsers: users.length,
    successCount,
    failureCount,
    results,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        summary,
        `Notifications sent: ${successCount} successful, ${failureCount} failed`,
        overallSuccess
      )
    );
});
