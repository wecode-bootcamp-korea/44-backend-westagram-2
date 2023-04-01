const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETKEY;

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})");
  const emailValidation = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.]+[a-zA-Z]{2,3}$/i);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 400;
    throw err;
  } else if (!emailValidation.test(email)) {
    const err = new Error("EMAIL_IS_NOT_VALID");
    err.statusCode = 400;
    throw err;
  }

  const createUser = await userDao.createUser(name, email, hashedPassword, profileImage);
  return createUser;
};

const posts = async (userId) => {
  return userDao.posts(userId);
};

const signIn = async (email, password) => {
  const userLogin = await userDao.signIn(email);
  if (!userLogin) {
    const err = new Error("유효한 Email이 아닙니다.");
    err.statusCode = 401;
    throw err; // 다오에서 받아온 에러를 다시 컨트롤러로 던짐
  }

  const checkHashed = await bcrypt.compare(password, userLogin.password);
  if (!checkHashed) {
    const err = new Error("비밀번호가 틀렸습니다.");
    err.statusCode = 401;
    throw err;
  }
  const payLoad = { userID: userLogin.id };
  const token = jwt.sign(payLoad, secretKey, { expiresIn: "5d" });

  return token;
};

module.exports = {
  signUp,
  posts,
  signIn,
};
