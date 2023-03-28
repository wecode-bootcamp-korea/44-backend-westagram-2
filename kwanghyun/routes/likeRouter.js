const express = require("express");
const likeController = require("../controllers/likeControllers");

const router = express.Router();

router.post("/like", likeController.likes);

module.exports = {
  router,
};
