const express = require("express");
const postController = require("../controllers/postControllers");
const token = require("../middlewares/auth");

const router = express.Router();

router.post("/newpost", token.checkToken, postController.createPosts);
router.get("", token.checkToken, postController.postslist);
router.patch("", token.checkToken, postController.modify);
router.delete("/:postId", token.checkToken, postController.postsDelete);

module.exports = {
  router,
};
