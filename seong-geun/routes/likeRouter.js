const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/like", likeController.createLike);

module.exports = {
  router,
};
