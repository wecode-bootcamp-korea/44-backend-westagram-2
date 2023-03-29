const postDao = require("../models/postDao");
const userDao = require("../models/userDao");

const createPost = async ({ title, content, userId, postingImageUrl }) => {
  await postDao.createPost({ title, content, userId, postingImageUrl });
  return "postCreated";
};

const postingList = async () => {
  return await postDao.postingList();
};

const getPostingByUserId = async (userId) => {
  const user = await userDao.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return await postDao.postingListByUserId(userId);
};

const deletePost = async (postId ) => {
 
  const post = await postDao.findMatched(postId);
  if (!post || post.length === 0) {
    throw new Error("postId not matched");
  }

  await postDao.deletePost(postId);
  return "postDeleted";
};

const patchPost = async ({
  userId,
  password,
  postId,
  title,
  content,
  postingImageUrl,
}) => {
  const user = await userDao.findMatched({ userId, password });
  if (user.length === 0) {
    throw new Error("user not matched");
  }
  const post = await postDao.findMatched(postId);
  if (post.length === 0) {
    throw new Error("postId not matched");
  }
  await postDao.patchPost({
    postId,
    title,
    content,
    postingImageUrl,
  });

  const patched = await postDao.postingPatched(postId);
  return patched[0];
};

module.exports = {
  createPost,
  postingList,
  getPostingByUserId,
  deletePost,
  patchPost,
};
