const appDataSource = require("../models/userDao");

const createUser = async ({ userName, email, profileImage, userPassword }) => {
  await appDataSource.createUser({ userName, email, profileImage, userPassword });
  return "userCreated";
};

module.exports = { createUser };
