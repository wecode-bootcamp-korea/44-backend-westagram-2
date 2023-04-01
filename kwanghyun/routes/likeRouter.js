const express = require("express");
const likeController = require("../controllers/likeControllers");
const token = require("../middlewares/auth");

const router = express.Router();

router.post("", token.checkToken, likeController.likes);

module.exports = {
  router,
};
