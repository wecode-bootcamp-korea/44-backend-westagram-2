const appDataSource = require("./appDataSource");

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    appDataSource.destroy();
  });

// 유저 회원 가입하기
const createUser = async (
  id,
  userProfileImage,
  userName,
  age,
  email,
  password
) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
		    id,
		    profile_image,
		    username,
		    age,
        email,
        password
        
		) VALUES (?, ?, ?, ?, ?, ?);
		`,
      [id, userProfileImage, userName, age, email, password]
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
