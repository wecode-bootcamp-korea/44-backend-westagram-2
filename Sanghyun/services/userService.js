const bcryptUtil = require('../util/bcrypt');
const appDataSource = require("../models/userDao");
const jwt = require('jsonwebtoken');

const createUser = async ({ userName, email, profileImage, userPassword }) => {
  
  const hashedPassword = await bcryptUtil.hashPassword(userPassword);
  await appDataSource.createUser({
    userName,
    email,
    profileImage,
    hashedPassword,
  });
  return "userCreated";
};

const signIn = async (email, userPassword) =>{

  const user = await appDataSource.emailMatched(email)
  if(user === 0){
    throw new Error("email not matched");
  }
  
  const hashedPassword = user.userPassword;
  
  const isPasswordMatched = await bcryptUtil.checkHash(userPassword, hashedPassword);
  if (!isPasswordMatched) {
    throw new Error("invalid password");
  }

  if(await appDataSource.emailPasswordMatched({email, hashedPassword}).length === 0){
    throw new Error("userId not matched");
  }
  
  const payLoad ={
    userId: user.id,
    email: user.email
  }

  const secretKey = process.env.JWT_SECRET_KEY; 
  const jwtToken = jwt.sign(payLoad, secretKey);

  return jwtToken;

}

module.exports = { createUser, signIn };
