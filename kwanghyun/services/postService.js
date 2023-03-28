const postDao = require("../models/postDao");

const createPosts = async (title, content, userId) => {
  const createPosts = await postDao.createPost(title, content, userId);

  return createPosts;
};

const postslist = async () => {
  return await postDao.postslist();
};

const modify = async (content, postId) => {
  const modify = await postDao.modify(content, postId);

  return modify;
};

const postsDelete = async (postId) => {
  const postsDelete = await postDao.postsDelete(postId);

  return postsDelete;
};

module.exports = {
  createPosts,
  postslist,
  modify,
  postsDelete,
};
