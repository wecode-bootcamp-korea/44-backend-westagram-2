const postDao = require('../models/postDao');

const newPostUp = async (title, content, userId) => {
  return postDao.postUpload(title, content, userId);
};

const getAllPosts = async () => {
  return postDao.allPosts();
};

const updatePost = async (userId, postId, title, content) => {
  try {
    return postDao.postChange(userId, postId, title, content);
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId) => {
  try {
    return postDao.postDeleting(postId);
  } catch (err) {
    console.log(err);
  }
};

const postsByUser = async (userId) => {
  return postDao.getUserPosts(userId);
};

module.exports = {
  newPostUp,
  getAllPosts,
  updatePost,
  deletePost,
  postsByUser,
};
