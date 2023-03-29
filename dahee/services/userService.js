const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const secretKey = process.env.SECRET_KEY;

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
    const authResult = await bcrypt.compare(password, userObj.password);
    if (authResult) {
      const payload = { userId: userObj.id };
      const token = jwt.sign(payload, secretKey);
      return token;
    } else {
      const error = new Error('INVALID_USER');
      error.statusCode = 400;
      throw error;
    }
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
