const likeService = require("../services/likeService");

const createDeleteLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const like = await likeService.createDeleteLike({
      userId,
      postId
    });

    res.status(200).json({ message: like });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createDeleteLike,
};
