const express = require("express");
const postController = require("../controllers/postController");
const { authorize } = require("../util/authorize");
const router = express.Router();

router.post("",authorize, postController.createPost);
router.get("", postController.postingList);
router.get("/:userId", postController.getPostingByUserId);
router.delete("/:postId", authorize ,postController.deletePost);
router.put("/:postId", authorize ,postController.patchPost);

module.exports = router;
