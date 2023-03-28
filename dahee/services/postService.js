const postDao = require('../models/postDao');

const newPostUp = async (title, content, userId) => {
  const postUpload = await postDao.postUpload(title, content, userId);
  return postUpload;
};

const getAllPosts = async () => {
  const allPosts = await postDao.allPosts();
  return allPosts;
};

module.exports = {
  newPostUp,
  getAllPosts,
};
