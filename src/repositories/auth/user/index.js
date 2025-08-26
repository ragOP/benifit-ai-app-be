const User = require("../../../models/user/index.js");

exports.existingUser = async (username) => {
  const user = await User.findOne({ username });

  if (user) return user;
  return null;
};

exports.createUser = async (username, hashedPassword, fcmToken) => {
  const user = await User.create({
    username,
    password: hashedPassword,
    fcmToken
  });
  return user;
};
