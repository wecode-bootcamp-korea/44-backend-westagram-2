const postDao = require("../models/postDao");
const userDao = require("../models/userDao");
const likeDao = require("../models/likeDao");

const createDeleteLike = async ({ userId, password, postId }) => {
  const user = await userDao.findMatched({ userId, password });
  if (user.length === 0) {
    throw new Error("user not matched");
  }
  const post = await postDao.findMatched(postId);
  if (post.length === 0) {
    throw new Error("postId not matched");
  }

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
