const router = require("express").Router();

const NewsController = require("../controllers/news");
const multer = require("../lib/multer");
const authenticate = require("../middlewares/user-auth");
const { createNews, updateNews } = require("../validators/news");
const validateBy = require("../middlewares/validator");
const validateById = require("../middlewares/validateById");

module.exports = function () {
  // router.post("/news/", authenticate, NewsController.create);
  router.get("/news", authenticate, NewsController.getAllNewsItems);

  router.get(
    "/news/:id",
    [authenticate, validateById()],
    NewsController.getNewsItem
  );

  router.post(
    "/news",
    [authenticate, multer.single("image"), validateBy(createNews)],
    NewsController.create
  );

  router.put(
    "/news/:id",
    [
      authenticate,
      multer.single("image"),
      validateById(),
      validateBy(updateNews),
    ],
    NewsController.update
  );

  router.delete(
    "/news/:id",
    [authenticate, validateById()],
    NewsController.delete
  );

  return router;
};
