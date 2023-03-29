const bcrypt = require('../util/bcrypt');
const appDataSource = require("../models/userDao");

const createUser = async ({ userName, email, profileImage, userPassword }) => {
  
  const hashedPassword = await bcrypt.hashPassword(userPassword);
  await appDataSource.createUser({
    userName,
    email,
    profileImage,
    hashedPassword,
  });
  return "userCreated";
};

module.exports = { createUser };
