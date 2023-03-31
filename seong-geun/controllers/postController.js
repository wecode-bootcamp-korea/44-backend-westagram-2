const postService = require("../services/postService");

const createPosts = async (req, res) => {
  try {
    const { title, postingImageUrl, postingContent, userId } = req.body;

    if (!title || !postingImageUrl || !postingContent || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.Posts(title, postingImageUrl, postingContent, userId);
    return res.status(201).json({
      message: "POSTING_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const data = await postService.getEposts();
    return res.status(201).json({
      message: "GET_E_POSTS_SUCCESS",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUposts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const data2 = await postService.getUposts(userId);
    return res.status(201).json({
      message: "GET_U_POSTS_SUCCESS",
      data2,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const patchPosts = async (req, res) => {
  try {
    const { postingContent, postingUserId } = req.body;

    if (!postingContent || !postingUserId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.patchPosts(postingContent, postingUserId);
    return res.status(201).json({
      message: "PATH_POSTS_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePosts = async (req, res) => {
  try {
    const { postingId } = req.body;
    if (!postingId) {
      return res.status(400).json({ message: "KEY_ERROR " });
    }
    await postService.deletePosts(postingId);
    return res.status(201).json({
      message: "DELETE_POSTS_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
  getPosts,
  getUposts,
  patchPosts,
  deletePosts,
};
