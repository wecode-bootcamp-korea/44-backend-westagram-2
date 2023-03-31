const postDao = require("../models/postDao");

const createPosts = async (title, content, userId) => {
  return postDao.createPost(title, content, userId);
};

const postslist = async () => {
  return await postDao.postslist();
};

const modify = async (content, postId) => {
  return postDao.modify(content, postId);
};

const postsDelete = async (postId) => {
  return postDao.postsDelete(postId);
};

module.exports = {
  createPosts,
  postslist,
  modify,
  postsDelete,
};
