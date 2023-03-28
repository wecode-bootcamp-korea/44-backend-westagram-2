const express = require("express");
const postController = require("../controllers/postControllers");

const router = express.Router();

router.post("/create", postController.createPosts);
router.get("/list", postController.postslist);
router.patch("/modify", postController.modify);
router.delete("/delete", postController.postsDelete);

module.exports = {
  router,
};
