const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/lists", postController.getPostings);
router.get("/:userId", postController.getPostingByUserId);
router.delete("/delete", postController.deletePost);
router.put("/patch", postController.patchPost);

module.exports = router;
