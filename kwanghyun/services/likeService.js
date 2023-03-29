const likeDao = require("../models/likeDao");

const likes = async (userId, postId) => {
  return likeDao.likes(userId, postId);
};

module.exports = {
  likes,
};
