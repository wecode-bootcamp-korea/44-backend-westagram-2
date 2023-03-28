const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const likeRouter = require("./likeRouter");
//const listRouter = require("./listRouter");

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/likes", likeRouter);
//router.use("/lists", listRouter);

module.exports = router;
