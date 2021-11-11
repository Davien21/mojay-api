const mongoose = require("mongoose");
const slugify = require("../utils/slugify");

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    shortDescription: {
      type: String,
      minlength: 2,
      trim: true,
      required: true,
    },
    altText: { type: String, required: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Draft"],
      required: true,
    },
    content: {
      type: String,
      minlength: 2,
      trim: true,
      required: true,
    },
    publishDate: {
      type: String,
      minlength: 2,
      maxlength: 10,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.pre(["save", "findOneAndUpdate"], async function (next) {
  let data = this._update || this;
  if (!data.title) next();

  try {
    data.slug = slugify(data.title);

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("news", newsSchema);
