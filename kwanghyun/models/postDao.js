const appDataSource = require("./appDataSource");

const createPost = async (title, content, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        title,
        content,
        user_id
      ) VALUES (?, ?, ?);
      `,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    console.log(err);
    error.statusCode = 500;
    throw error;
  }
};
const postslist = async () => {
  try {
    return await appDataSource.query(
      `SELECT
        users.id as userId,
        users.profile_image as userProfileImage,
        posts.user_id as postingId,
        posts.content as postingContent
        FROM users
        LEFT JOIN posts
        ON users.id = posts.user_id
      `
    );
  } catch (err) {
    const error = new Error("UNABLE_TO_GET_DATA");
    error.statusCode = 500;
    throw error;
  }
};

const modify = async (postId, content) => {
  try {
    return await appDataSource.query(
      `UPDATE
        posts
        SET content = ?
        WHERE posts.id = ?;
      `,
      [postId, content]
    );
  } catch (err) {
    const error = new Error("CAN'T_MODIFY");
    error.statusCode = 500;
    throw error;
  }
};

const postsDelete = async (postId) => {
  try {
    return await appDataSource.query(
      `DELETE
      FROM posts
      WHERE posts.id = ?; 
      `,
      [postId]
    ); // WHERE id IN (?) AND user_id = ? 이런식으로도 작성가능 이런식으로 작성하면 (?)값으로 여러개를 줄 수 있음
  } catch (err) {
    const error = new Error("CAN'T_DELETE");
    console.log(err);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  postslist,
  modify,
  postsDelete,
};
