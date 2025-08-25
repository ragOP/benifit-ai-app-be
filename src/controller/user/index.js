const { ApiResponse } = require("../../utils/apiResponse/index.js");
const { ApiError } = require("../../utils/apiError/index.js");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const Response = require("../../models/Response/index.js");

const TAGS = {
  is_md: "Medicare",
  is_ssdi: "SSDI",
  is_auto: "Auto",
  is_mva: "MVA",
  is_debt: "Debt",
  is_rvm: "Reverse Mortgage",
};
exports.handleResponse = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    age,
    userId,
    zipCode,
    tags,
    origin,
    sendMessageOn,
    number,
  } = req.body;
  const tagsArray = (tags || []).map((t) => TAGS[t]).filter(Boolean);
  const response = await Response.create({
    fullName,
    email,
    age,
    userId,
    zipCode,
    tags: tagsArray,
    origin,
    sendMessageOn,
    number,
  });
  if (!response) {
    throw new ApiError(404, "Response Creation Failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, response, "User data saved successfully"));
});

exports.handleQualifiedUser = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    throw new ApiResponse(404, "", "enter a valid user id");
  }
  const data = await Response.findOne({ userId: String(userId) });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "user records successfully"));
});

exports.handleAllRecords = asyncHandler(async (req, res) => {
  const data = await Response.find({});
  return res.status(200).json(new ApiResponse(200, data, "All records found"));
});
