const userDao = require("../models/likeDao");

const createLike = async (userId, postId) => {
  const createLike = await userDao.createLike(userId, postId);

  return createLike;
};

module.exports = {
  createLike,
};
