const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');

const signUp = async (name, email, password, profileImage) => {
  const pwValidaiton = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  if (!pwValidaiton.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  return userDao.createUser(name, email, password, profileImage);
};

const signIn = async (email, password) => {
  const hashedPassword = await userDao.verifyUser(email);
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  signUp,
  signIn,
};
