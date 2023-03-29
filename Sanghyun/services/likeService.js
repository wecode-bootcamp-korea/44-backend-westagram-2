const postDao = require("../models/postDao");
const userDao = require("../models/userDao");
const likeDao = require("../models/likeDao");

const createDeleteLike = async ({ userId, postId }) => {
  
  const like = await likeDao.findMatched({ userId, postId });

  if (like.length === 0) {
    await likeDao.createLike({ userId, postId });
    return "likesCreated";
  } else {
    await likeDao.deleteLike({ userId, postId });
    return "likesDeleted";
  }
};

module.exports = {
  createDeleteLike,
};
