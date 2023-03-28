const postDao = require('../models/postDao');

const newPostUp = async (title, content, userId) => {
  const postUpload = await postDao.postUpload(title, content, userId);
  return postUpload;
};

module.exports = {
  newPostUp,
};
