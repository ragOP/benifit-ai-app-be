const Offer = require("../../models/offers/index.js");
const Response = require("../../models/Response/index.js");
const User = require("../../models/user/index.js");

exports.storeEligibleOffers = async (userId) => {
  const response = await Response.findOne({ userId });
  if (!response || response.tags.length === 0) {
    return {
      status: false,
      data: [],
      sucessCode: 404,
      message: "User not found",
    };
  }
  console.log(userId);

  const createdOffers = [];
  const userIdValue = response.userId || undefined;
  for (const tag of response.tags) {
    const existing = await Offer.findOne({ user: userIdValue, offerId: tag });
    if (!existing) {
      const offer = await Offer.create({
        user: userIdValue,
        offerId: tag,
        status: "abandoned",
      });
      createdOffers.push(offer);
    } else {
      createdOffers.push(existing);
    }
  }
  return {
    status: true,
    data: createdOffers,
    sucessCode: 200,
    message: "offers created successfully",
  };
};

exports.claimOffer = async (userId, offerIds) => {
  await Offer.updateMany(
    {
      user: userId,
      offerId: { $in: offerIds },
    },
    { $set: { status: "claimed" } }
  );
  const claimedOffers = await Offer.find({
    user: userId,
    status: "claimed",
  });
  if (claimedOffers.length == 0) {
    return {
      status: false,
      data: null,
      succesCode: 200,
      message: "no claimed offer",
    };
  }
  return {
    status: true,
    data: claimedOffers,
    sucessCode: 200,
    message: "claimed offers succesfully",
  };
};

exports.abondendOffer = async (userId) => {
  const abondendOffer = await Offer.find({
    user: userId,
    status: "abandoned",
  });
  if (abondendOffer.length == 0) {
    return {
      status: true,
      data: [],
      sucessCode: 200,
      message: "no abondend offer",
    };
  }
  return {
    status: true,
    data: abondendOffer,
    sucessCode: 200,
    message: "abondend data ",
  };
};
exports.storeClaimedOffer = async (userId) => {
  const claimedOffers = await Offer.find({ user: userId, status: "claimed" });

  const claimedOfferIds = claimedOffers.map((item) => item.offerId);

  const updatedResponse = await Response.findOneAndUpdate(
    { userId: userId },
    {
      $addToSet: { claimedOffer: { $each: claimedOfferIds } },
      $pull: { unClaimedOffer: { $in: claimedOfferIds } },
    },

    { new: true }
  );

  return updatedResponse;
};
exports.storeUnclaimedOffer = async (userId) => {
  const abandonedOffers = await Offer.find({
    user: userId,
    status: "abandoned",
  });

  const offerIds = abandonedOffers.map((item) => item.offerId);

  const updatedResponse = await Response.findOneAndUpdate(
    { userId: userId },
    { $addToSet: { unClaimedOffer: { $each: offerIds } } },
    { new: true }
  );

  return updatedResponse;
};
exports.getClaimedOffer = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      status: 404,
      data: null,
      message: "user not found",
    };
  }
  const data = await Response.findOne({ user: userId });
  if (!data) {
    return {
      status: 404,
      data: null,
      message: "Offer not found",
    };
  }
  return {
    status: 200,
    data: data,
    message: "claimed offer data fetched succssfully",
  };
};
