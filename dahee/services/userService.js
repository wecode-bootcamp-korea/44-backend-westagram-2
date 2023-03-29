const userDao = require('../models/userDao');
//데이터 비교 변형은 전부 service에서 함
const bcrypt = require('bcrypt');
const saltRounds = 12;

const signUp = async (name, email, password, profileImage) => {
  const pwValidaiton = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  if (!pwValidaiton.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return userDao.createUser(name, email, hashedPassword, profileImage);
};

const signIn = async (email, password) => {
  try {
    const userObj = await userDao.verifyUser(email);
    const userAuth = {};
    userAuth.result = await bcrypt.compare(password, userObj.password);
    userAuth.id = userObj.id;
    return userAuth;
  } catch (err) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  signUp,
  signIn,
};
