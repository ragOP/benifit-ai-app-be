const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../../utils/asynchandler/index.js");
const { ApiResponse } = require("../../utils/apiResponse/index.js");

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return new ApiResponse(res, 401, "Unauthorized: No token provided");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
module.exports = verifyJwt;
