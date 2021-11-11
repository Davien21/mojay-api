const Joi = require("joi");

const createNews = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  shortDescription: Joi.string().min(300).required(),
  image: Joi.string(),
  altText: Joi.string(),
  content: Joi.string().required(),
  status: Joi.alternatives(["Published", "Draft"]).required(),
  publishDate: Joi.string().required(),
});

const updateNews = Joi.object({
  title: Joi.string().min(2).max(255),
  shortDescription: Joi.string().min(300),
  image: Joi.string(),
  altText: Joi.string(),
  content: Joi.string(),
  status: Joi.alternatives(["Published", "Draft"]),
  publishDate: Joi.string(),
});

module.exports = {
  createNews,
  updateNews,
};
