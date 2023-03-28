const postService = require('../services/postService');

const newPostUp = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.newPostUp(title, content, userId);
    res.status(201).json({ message: 'NEWPOST_UPLOADED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ messgae: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const data = await postService.getAllPosts();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ messgae: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { title, content } = req.body;

    if (!userId || !postId || !title || !content) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.updatePost(userId, postId, title, content);
    res.status(200).json({ message: 'POST_UPDATED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.deletePost(postId);
    res.status(204).json({ message: 'POST_DELETED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  newPostUp,
  getAllPosts,
  updatePost,
  deletePost,
};
