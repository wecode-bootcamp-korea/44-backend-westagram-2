const likeDao = require("../models/likeDao");

const likes = async (userId, postId) => {
  const likes = await likeDao.likes(userId, postId);

  return likes;
};

module.exports = {
  likes,
};
