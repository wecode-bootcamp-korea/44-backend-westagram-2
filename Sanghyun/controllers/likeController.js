const likeService = require("../services/likeService");

const createDeleteLike = async (req, res) => {
  try {
    const { userId, password, postId } = req.body;
    if (!userId || !password || !postId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const like = await likeService.createDeleteLike({
      userId,
      password,
      postId,
    });

    res.status(200).json({ message: like });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createDeleteLike
};
