const express = require("express");
const likeController = require("../controllers/likeController");
const { authorize } = require("../util/authorize");
const router = express.Router();

router.post("/:postId", authorize,likeController.createDeleteLike);

module.exports = router;
