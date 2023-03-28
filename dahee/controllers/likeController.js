const likeService = require('../services/likeService');

const newLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await likeService.newLike(userId, postId);
    res.status(201).json({ message: 'NEW_LIKE_CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ messgae: err.message });
  }
};

module.exports = {
  newLike,
};
