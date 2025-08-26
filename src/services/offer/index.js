const Offer = require("../../models/offers/index.js");
const Response = require("../../models/Response/index.js");

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
    message: "",
  };
};
