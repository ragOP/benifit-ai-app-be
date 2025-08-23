const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
      tolowercase: true,
    },
    age: {
      type: Number,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      required: true,
    },
    origin: {
      type: String,
      default: "",
    },
    sendMessageOn: {
      type: String,
      default: "",
    },
    isPaymentSuccess: {
      type: Boolean,
      default: false,
    },
    number: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("response99", responseSchema);

module.exports = Response;
