const appDataSource = require("./myDataSources");

const createUser = async ({
  userName,
  email,
  profileImage,
  hashedPassword,
}) => {
  const sameUser = await appDataSource.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (sameUser.length !== 0) {
    throw new Error("email alreay exists, not valid ");
  }

  await appDataSource.query(
    `INSERT INTO users(
        user_name ,
        email,
        profile_image,
        user_password     
      ) VALUES (?, ?, ?, ?);
       `,
    [userName, email, profileImage, hashedPassword]
  );
};

const getUserById = async (userId) => {
  const user = await appDataSource.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  return user[0];
};

const emailMatched = async (email) => {
  const result = await appDataSource.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  if (result.length === 0) {
    throw new Error("user not found");
  }

  const user = {
    id: result[0].id,
    email: result[0].email,
    userPassword: result[0].user_password,
  };

  return user;
};

const emailPasswordMatched = async ({ email, password }) => {
  const result = await appDataSource.query(
    `SELECT * FROM users WHERE email = ? AND user_password = ?`,
    [email, password]
  );
  return result[0];
};

module.exports = {
  createUser,
  getUserById,
  emailMatched,
  emailPasswordMatched,
};
