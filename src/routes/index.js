const router = require("express").Router();
const userRouter = require("./users");
const newsRouter = require("./news");
const mediaRouter = require("./media");
const allDataRouter = require("./all");

module.exports = () => {
  router.use(userRouter());
  router.use(newsRouter());
  router.use(mediaRouter());
  router.use(allDataRouter());

  return router;
};
