const userDao = require('../models/userDao');

const signUp = async (name, email, password, profileImage) => {
  const pwValidaiton = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  if (!pwValidaiton.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );
  return createUser;
};

const postsByUser = async (userId) => {
  if (!userId) {
    const err = new Error('USERID_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const getUserPosts = await userDao.getUserPosts(userId);
  return getUserPosts;
};

module.exports = {
  signUp,
  postsByUser,
};
