const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9)(?=.*[!@#$%^&*])");
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 400;
    throw err;
  }

  const createUser = await userDao.createUser(name, email, password, profileImage);
  return createUser;
};

const posts = async (userId) => {
  return userDao.posts(userId);
};

module.exports = {
  signUp,
  posts,
};
