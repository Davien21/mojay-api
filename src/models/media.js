const mongoose = require("mongoose");

const mediaResourceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
      required: true,
    },
    url: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mediaResource", mediaResourceSchema);
