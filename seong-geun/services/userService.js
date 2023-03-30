const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const signUp = async (id, userProfileImage, userName, age, email, password) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  //Bcrypt 비밀번호 암호화
  const saltRounds = 12; // 기본이 10번, 숫자가 올라갈수록 연산 시간과 보안이 높아진다.
  const makeHash = await bcrypt.hash(password, saltRounds);

  const validPassword = await bcrypt.compare(req.body.passwrod, users.password);
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const createUser = await userDao.createUser(
    id,
    userProfileImage,
    userName,
    age,
    email,
    password
  );

  return createUser;
};

//Bcrypt 검증
const checkHash = await checkHash("passwrod", hashedPassword);

module.exports = {
  signUp,
};
