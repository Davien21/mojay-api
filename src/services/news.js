const News = require("../models/news");

class NewsService {
  getAllNews() {
    return News.find().select("-__v -public_id").sort({ publishDate: "desc" });
  }

  create(news) {
    return News.create(news);
  }

  findById(id) {
    return News.findById(id);
  }

  update(id, updateQuery) {
    return News.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id) {
    return News.findByIdAndDelete(id);
  }
}

module.exports = new NewsService();
