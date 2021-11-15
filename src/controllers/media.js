const response = require("../utils/response");
const { generateAuthToken } = require("../utils/token");

const {
  NotFoundError,
  BadRequestError,
  UnAuthorizedError,
  DuplicateError,
  InternalServerError,
} = require("../lib/errors");

const mediaService = require("../services/media");
const { uploadToCloud, deleteFromCloud } = require("../lib/cloudinary");
const { omit } = require("lodash");

class MediaResourceController {
  async create(req, res) {
    const { body, file } = req;
    if (!file?.path) throw new BadRequestError("Invalid file path");
    try {
      const fileUpload = await uploadToCloud(file.path, "raw");
      if (!fileUpload) throw new BadRequestError("Unable to upload file");
      console.log(fileUpload)
      const typeStartIndex = file.filename.lastIndexOf(".") + 1;
      const type = file.filename.slice(typeStartIndex);

      fileUpload.size = file.size;
      fileUpload.type = type;
      Object.assign(body, fileUpload);

      await mediaService.create(body);
      res.send(response("Media Resource uploaded successfully"));
    } catch (error) {
      console.log(error);
      throw new InternalServerError();
    }
  }

  async getMediaResource(req, res) {
    const media = await mediaService.findById(req.params.id);
    if (!media) throw new NotFoundError("Invalid MediaResource Item");

    res.send(response("Media Resource uploaded successfully", media));
  }

  async getAllMediaResources(req, res) {
    const media = await mediaService.getAllMediaResources();

    res.send(response("Media Resource uploaded successfully", media));
  }

  async update(req, res) {
    const { body, file } = req;
    const media = await mediaService.findById(req.params.id);
    if (!media) throw new BadRequestError("Invalid Media Resource Item");

    if (file?.path) {
      const fileUpload = await uploadToCloud(file.path, "raw");
      if (!fileUpload) throw new BadRequestError("Unable to upload image");

      const typeStartIndex = file.filename.lastIndexOf(".") + 1;
      const type = file.filename.slice(typeStartIndex);

      fileUpload.size = file.size;
      fileUpload.type = type;

      Object.assign(body, fileUpload);

      await deleteFromCloud(media.public_id, "raw");
    }

    const updatedMedia = await mediaService.update(req.params.id, body);

    res.send(response("Media Resource updated successfully", updatedMedia));
  }

  async delete(req, res) {
    const media = await mediaService.findById(req.params.id);
    if (!media) throw new NotFoundError("Invalid Media Resource Item");

    await deleteFromCloud(media.public_id, "raw");

    await mediaService.delete(req.params.id);
    res.send(response("Media Resource deleted successfully"));
  }
}

module.exports = new MediaResourceController();
