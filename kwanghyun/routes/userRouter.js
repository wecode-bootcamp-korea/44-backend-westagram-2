const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", userController.signUp);
router.get("/posts/:userId", userController.posts);

module.exports = {
  router,
};
