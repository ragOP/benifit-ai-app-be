const { ApiResponse } = require("../../utils/apiResponse/index.js");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const {
  registerUser,
  loginUser,
  loginWithGoogle,
} = require("../../services/auth/user/index.js");

exports.handleRegister = asyncHandler(async (req, res) => {
  const { username, password, email, fcmToken, role = "User" } = req.body;
  if (!username || !password) {
    throw new ApiResponse(400, "", "username or password is invalid");
  }
  const result = await registerUser(username, password, email, fcmToken, role);
  const { statusCode, data, message } = result;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

exports.handleLogin = asyncHandler(async (req, res) => {
  const { loginId, email, password, fcmToken } = req.body;
  if (!loginId || !password) {
    throw new ApiResponse(400, "", "loginId or password is invalid");
  }
  const result = await loginUser(loginId, password, fcmToken);
  console.log(result, "kndsbvkjdfs");

  const { statusCode, data, message } = result;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});

exports.handleGoogleLogin = asyncHandler(async (req, res) => {
  const { idToken, fcmToken } = req.body;
  if (!idToken) {
    throw new ApiResponse(400, "", "ID Token is required");
  }
  const result = await loginWithGoogle(idToken, fcmToken);
  const { statusCode, data, message } = result;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
});
