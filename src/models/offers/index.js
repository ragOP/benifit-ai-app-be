const { mongoose, Schema } = require("mongoose");

const offerSchema = new Schema(
  {
    offerId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["abandoned", "claimed"],
      default: "abandoned",
    },
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
