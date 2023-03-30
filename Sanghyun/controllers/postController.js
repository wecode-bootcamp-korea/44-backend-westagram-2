const postService = require("../services/postService");
const jwt = require('jsonwebtoken');

const createPost = async (req, res) => {
  try {
    const { title, content, postingImageUrl } = req.body;
    if (!title || !content || !postingImageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userId = req.user
    const message = await postService.createPost({
      title,
      content,
      userId,
      postingImageUrl,
    });

    res.status(201).json({ message: message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const postingList = async (req, res, next) => {
  try {
    const postings = await postService.postingList();
    res.status(200).json({ data: postings });
  } catch (err) {
    next(err);
  }
};

const getPostingByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const postings = await postService.getPostingByUserId(userId);
    res.status(200).json({ data: postings });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const {postId} = req.params;
    if (!postId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await postService.deletePost(
      postId,
    );

    res.status(200).json({ message: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const patchPost = async (req, res) => {
  try {
    const { userId, password, postId, title, content, postingImageUrl } =
      req.body;
    if (
      !userId ||
      !password ||
      !postId ||
      !title ||
      !content ||
      !postingImageUrl
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await postService.patchPost({
      userId,
      password,
      postId,
      title,
      content,
      postingImageUrl,
    });

    res.status(200).json({ message: "patched done", data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  postingList,
  getPostingByUserId,
  deletePost,
  patchPost,
};
