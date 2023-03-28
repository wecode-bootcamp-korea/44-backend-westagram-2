const postService = require("../services/postService");

const createPosts = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.createPosts(title, content, userId);

    res.status(201).json({ message: "POSTING_SUCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postslist = async (req, res) => {
  try {
    const rows = await postService.postslist();
    return res.status(200).json({ rows });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const modify = async (req, res) => {
  try {
    const { content, postId } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.modify(content, postId);
    res.status(200).json({ message: "MODIFY_SUCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.messasge });
  }
};

const postsDelete = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.postsDelete(postId);
    res.status(200).json({ message: "DELETE_COMPLETE" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
  postslist,
  modify,
  postsDelete,
};
