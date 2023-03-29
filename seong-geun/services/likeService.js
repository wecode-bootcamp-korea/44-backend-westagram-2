const userDao = require("../models/likeDao");

const Like = async (userId, postId) => {
  const createLike = await userDao.createLike(userId, postId);

  return createLike;
};

module.exports = {
  Like,
};
