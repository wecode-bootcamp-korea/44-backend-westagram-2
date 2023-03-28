const postDao = require('../models/postDao');

const newPostUp = async (title, content, userId) => {
  const postUpload = await postDao.postUpload(title, content, userId);
  return postUpload;
};

const getAllPosts = async () => {
  const allPosts = await postDao.allPosts();
  return allPosts;
};

const updatePost = async (userId, postId, title, content) => {
  try {
    const postChange = await postDao.postChange(userId, postId, title, content);
    return postChange;
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId) => {
  try {
    const postDeleting = await postDao.postDeleting(postId);
    return postDeleting;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  newPostUp,
  getAllPosts,
  updatePost,
  deletePost,
};
