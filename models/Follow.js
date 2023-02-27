const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema(
  {
    followerId: {
      type: String,
      required: true,
    },
    followedId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Follow", FollowSchema);
