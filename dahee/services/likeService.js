const likeDao = require('../models/likeDao');

const newLike = async (userId, postId) => {
  try {
    const createLike = await likeDao.createLike(userId, postId);
    return createLike;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  newLike,
};
