const response = require("../utils/response");

const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} = require("../lib/errors");

const newsService = require("../services/news");
const { uploadToCloud, deleteFromCloud } = require("../lib/cloudinary");

class NewsController {
  async create(req, res) {
    if (!req?.file?.path) throw new BadRequestError("Invalid file path");

    const imgUpload = await uploadToCloud(req.file.path);
    if (!imgUpload) throw new BadRequestError("Unable to upload image");

    Object.assign(req.body, imgUpload);

    await newsService.create(req.body);

    res.send(response("News updated uploaded successfully"));
  }

  async getNewsItem(req, res) {
    const news = await newsService.findById(req.params.id);
    if (!news) throw new NotFoundError("Invalid News Item");

    res.send(response("News updated uploaded successfully", news));
  }

  async getAllNewsItems(req, res) {
    const news = await newsService.getAllNews();

    res.send(response("News updated uploaded successfully", news));
  }

  async update(req, res) {
    const news = await newsService.findById(req.params.id);
    if (!news) throw new BadRequestError("Invalid News Item");

    if (req?.file?.path) {
      const imgUpload = await uploadToCloud(req.file.path);
      if (!imgUpload) throw new BadRequestError("Unable to upload image");

      Object.assign(req.body, imgUpload);

      await deleteFromCloud(news.public_id);
    }

    const updatedNews = await newsService.update(req.params.id, req.body);

    res.send(response("News updated uploaded successfully", updatedNews));
  }

  async delete(req, res) {
    const news = await newsService.findById(req.params.id);
    if (!news) throw new BadRequestError("Invalid News Item");

    const del = await deleteFromCloud(news.public_id);
    if (del.result !== "ok")
      throw new InternalServerError("Unable to delete image");

    await newsService.delete(req.params.id);
    res.send(response("News Item deleted successfully"));
  }
}

module.exports = new NewsController();
