const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/like", likeController.Like);

module.exports = {
  router,
};
