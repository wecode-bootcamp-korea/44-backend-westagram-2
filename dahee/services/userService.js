const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const signUp = async (name, email, password, profileImage) => {
  const pwValidaiton = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );

  const emailValidation = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  if (!pwValidaiton.test(password) || !emailValidation.test(email)) {
    const err = new Error('PASSWORD_OR_EMAIL_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return userDao.createUser(name, email, hashedPassword, profileImage);
};

const signIn = async (email, password) => {
  try {
    const user = await userDao.verifyUserByEmail(email);

    if (!user) {
      const error = new Error('INVALID_USER');
      err.statusCode = 401;
      throw err;
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      const error = new Error('INVALID_USER');
      error.statusCode = 401;
      throw error;
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, secretKey);
    return token;
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
