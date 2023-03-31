const likeService = require("../services/likeService");

const createDeleteLike = async (req, res) => {
  try {
    const userId = req.userId;
    const {postId} = req.params;
    if (!userId || !postId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const like = await likeService.createDeleteLike({
      userId,
      postId
    });

    res.status(201).json({ message: like });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createDeleteLike,
};
