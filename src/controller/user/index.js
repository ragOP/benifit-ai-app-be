const { ApiResponse } = require("../../utils/apiResponse/index.js");
const { ApiError } = require("../../utils/apiError/index.js");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const Response = require("../../models/Response/index.js");
const {
  storeEligibleOffers,
  claimOffer,
  abondendOffer,
  storeClaimedOffer,
  storeUnclaimedOffer,
  getClaimedOffer,
} = require("../../services/offer/index.js");
const User = require("../../models/user/index.js");

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

exports.handleAbandonedClaim = asyncHandler(async (req, res) => {
  const { claimedOfferIds, userId } = req.body;
  if (!userId) {
    throw new ApiResponse(404, "enter a valid user id");
  }
  console.log(userId);
  const eligibleOffers = await storeEligibleOffers(userId);
  if (!eligibleOffers.status) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          eligibleOffers.statusCode,
          eligibleOffers.data,
          eligibleOffers.message
        )
      );
  }

  const claimedOfferData = await claimOffer(userId, claimedOfferIds);
  const abondendOfferData = await abondendOffer(userId);
  const claim = await storeClaimedOffer(userId);
  const unClaimedData = await storeUnclaimedOffer(userId);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        claimedOfferData,
        abondendOfferData,
      },
      "Data fetched successfully"
    )
  );
});
exports.handleClaimedOffers = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    throw new ApiResponse(404, "", "enter a valid user id");
  }
  const claimedData = await getClaimedOffer(userId);
  return res
    .status(200)
    .json(
      new ApiResponse(claimedData.status, claimedData.data, claimedData.message)
    );
});

exports.handleGetAllUsers = asyncHandler(async (req, res) => {
  let { search, page = 1, limit = 50 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const query = {};
  if (search) {
    query.$or = [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit),
    User.countDocuments(query),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users: data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
      "All users found"
    )
  );
});
