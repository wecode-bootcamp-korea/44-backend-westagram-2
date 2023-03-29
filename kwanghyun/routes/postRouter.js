const express = require("express");
const postController = require("../controllers/postControllers");

const router = express.Router();

router.post("newpost", postController.createPosts);
router.get("", postController.postslist);
router.patch("", postController.modify);
router.delete("/:postId", postController.postsDelete);

module.exports = {
  router,
};
