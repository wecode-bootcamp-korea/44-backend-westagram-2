const postDao = require("../models/postDao");

const Posts = async (
  postingId,
  title,
  postingImageUrl,
  postingContent,
  userId
) => {
  const createPost = await postDao.createPost(
    postingId,
    title,
    postingImageUrl,
    postingContent,
    userId
  );

  return createPost;
};

const getEposts = async () => {
  const getEposts = await postDao.getEposts();
  return getEposts;
};

const getUposts = async (userId) => {
  const getUposts = await postDao.getUposts(userId);
  return getUposts;
};

const patchPosts = async (postingContent, postingUserId) => {
  const patchPosts = await postDao.patchPosts(postingContent, postingUserId);
  return patchPosts;
};

const deletePosts = async (postingId) => {
  const deletePosts = await postDao.deletePosts(postingId);
  return deletePosts;
};

module.exports = {
  Posts,
  getEposts,
  getUposts,
  patchPosts,
  deletePosts,
};

/// bcypt 사용 비밀번호 암호화한후 model로 전달
