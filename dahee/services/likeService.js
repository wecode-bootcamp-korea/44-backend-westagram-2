const likeDao = require('../models/likeDao');

const newLike = async (userId, postId) => {
  try {
    return likeDao.createLike(userId, postId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  newLike,
};
