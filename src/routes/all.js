const router = require("express").Router();
const response = require("../utils/response");

const MediaService = require("../services/media");
const NewsService = require("../services/news");
const UsersService = require("../services/user");

const authenticate = require("../middlewares/user-auth");

module.exports = function () {
  router.use("/all", authenticate, async (req, res) => {
    const media = await MediaService.getAllMediaResources();
    const news = await NewsService.getAllNews();
    const users = await UsersService.getAllUsers();

    const decodedData = await UsersService.verifyAuthToken(
      req.headers["x-auth-token"]
    );
    const user = await UsersService.findByEmail(decodedData.email).select(
      "name email"
    );

    res.send(
      response("All Data retrieved successfully", {
        media,
        news,
        users,
        currentUser: user,
      })
    );
  });

  return router;
};
