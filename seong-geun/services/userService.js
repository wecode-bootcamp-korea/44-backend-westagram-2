const userDao = require("../models/userDao");

const signUp = async (userProfileImage, userName, age, email, password) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const createUser = await userDao.createUser(
    userProfileImage,
    userName,
    age,
    email,
    password
  );

  return createUser;
};

module.exports = {
  signUp,
};
