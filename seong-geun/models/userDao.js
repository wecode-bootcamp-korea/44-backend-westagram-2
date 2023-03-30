const appDataSource = require("./appDataSource");

// 유저 회원 가입하기
const createUser = async (userProfileImage, userName, age, email, password) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
		    profile_image,
		    username,
		    age,
        email,
        password
        
		) VALUES (?, ?, ?, ?, ?);
		`,
      [userProfileImage, userName, age, email, password]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
