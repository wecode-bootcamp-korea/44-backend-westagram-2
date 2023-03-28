const likeService = require("../services/likeService");

const likes = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await likeService.likes(userId, postId);
    res.status(200).json({ message: "LIKE_CHECK" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.messasge });
  }
};

module.exports = {
  likes,
};
