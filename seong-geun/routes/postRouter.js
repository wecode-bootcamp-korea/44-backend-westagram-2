const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/posts", postController.Posts);
router.get("/eposts", postController.getPosts);
router.get("/uposts/", postController.getUposts);
router.patch("/modifyposts", postController.patchPosts);
router.delete("/deleteposts", postController.deletePosts);

module.exports = {
  router,
};
