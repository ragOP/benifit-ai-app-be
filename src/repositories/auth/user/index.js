const User = require("../../../models/user/index.js");

exports.existingUser = async (username, email) => {
  const searchParams = {};
  if (username) searchParams.username = username;
  if (email) searchParams.email = email;
  const user = await User.findOne(searchParams);

  if (user) return user;
  return null;
};

exports.createUser = async (username, hashedPassword, email, fcmToken) => {
  const user = await User.create({
    username,
    password: hashedPassword,
    email,
    fcmToken
  });
  return user;
};
