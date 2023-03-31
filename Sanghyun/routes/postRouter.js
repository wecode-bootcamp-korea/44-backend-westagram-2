const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("", postController.createPost);
router.get("", postController.postingList);
router.get("/:userId", postController.getPostingByUserId);
router.delete("/:postId", postController.deletePost);
router.put("", postController.patchPost);

module.exports = router;
