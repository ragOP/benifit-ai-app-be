const User = require("../../../models/user/index.js");
const {
  existingUser,
  createUser,
} = require("../../../repositories/auth/user/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (username, password) => {
  const checkExistingUser = await existingUser(username);
  if (checkExistingUser) {
    return {
      statusCode: 409,
      message: "user already exist",
      data: null,
    };
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await createUser(username, hashedPassword);
  if (!newUser) {
    return {
      statusCode: 500,
      message: "Failed to create User",
      data: null,
    };
  }
  const data = await User.findById(newUser._id).select("-password");
  return {
    statusCode: 201,
    message: "user created successfully",
    data: data,
  };
};

exports.loginUser = async (username, password) => {
  const user = await existingUser(username);
  if (!user) {
    return {
      statusCode: 404,
      message: "user not found",
      data: null,
    };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      statusCode: 401,
      message: "invalid credentials",
      data: null,
    };
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
  const data = await User.findById(user._id).select("-password");
  return {
    statusCode: 200,
    message: "login successful",
    token: token,
    data: data,
  };
};
