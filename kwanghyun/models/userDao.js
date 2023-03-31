const appDataSource = require("./appDataSource");

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        profile_image
      ) VALUES (?,?,?,?);
      `,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const posts = async (userId) => {
  try {
    const post = await appDataSource.query(
      `SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
        JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId", posts.id,
          "postingContent", posts.content
          )
        ) as postings
      FROM posts
      INNER JOIN users
      ON users.id = posts.user_id
      WHERE posts.user_id = ?
      GROUP BY posts.user_id
      `,
      [userId]
    );
    return post;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  posts,
};
