const express = require("express");
const router = express.Router();
const feedUploadCtrl = require("../controllers/feedUpload_controltrol");

let routes = (app) => {
  router.post("/upload/Post", controller.upload);
  router.get("/files/Post", controller.getListFiles);
  router.get("/files/Post/:name", controller.download);

  app.use(router);
};

module.exports = routes;
