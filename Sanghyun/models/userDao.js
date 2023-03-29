const appDataSource = require("./myDataSources");

const createUser = async ({ userName, email, profileImage, userPassword }) => {
  await appDataSource.query(
    `INSERT INTO users(
        user_name ,
        email,
        profile_image,
        user_password     
      ) VALUES (?, ?, ?, ?);
       `,
    [userName, email, profileImage, userPassword]
  );
};

const getUserById = async (userId) => {
  const user = await appDataSource.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  return user[0];
};

const findMatched = async ({ userId, password }) => {
  const user = await appDataSource.query(
    `SELECT * FROM users WHERE id = ? AND user_password = ?`,
    [userId, password]
  );
  return user;
};

module.exports = {
  createUser,
  getUserById,
  findMatched,
};
