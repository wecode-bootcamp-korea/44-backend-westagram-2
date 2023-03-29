const express = require("express");
const likeController = require("../controllers/likeControllers");

const router = express.Router();

router.post("", likeController.likes);

module.exports = {
  router,
};
