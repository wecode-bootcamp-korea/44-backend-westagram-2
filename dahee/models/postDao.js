const appDataSource = require('./appDataSource');

const postUpload = async (title, content, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
                    title,
                    content,
                    user_id
                ) VALUES (?, ?, ?)`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const allPosts = async () => {
  try {
    return await appDataSource.query(
      `SELECT
      u.id userId,
      u.profile_image userProfileImage,
      p.id postingId,
      p.image_url postingImageUrl,
      p.content postingContent
    FROM posts p
    JOIN users u ON p.user_id = u.id`
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const postChange = async (userId, postId, title, content) => {
  try {
    return await appDataSource.query(
      `UPDATE posts   
        SET
        title = ?,
        content = ? 
       WHERE user_id = ? AND id = ?;`,
      [title, content, userId, postId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const postDeleting = async (postId) => {
  await appDataSource.query(
    `DELETE FROM posts
        WHERE posts.id = ${postId}`
  );
};

const getUserPosts = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
            u.id userId,
            u.profile_image userProfileImage,
            pj.postings
          FROM users u
          JOIN 
            (SELECT 
              user_id, 
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  "postingId", id, 
                  "postingImageUrl", image_url, 
                  "postingContent", content
                  )
                ) postings
            FROM posts p
            GROUP BY id) pj
          ON u.id = pj.user_id
          WHERE u.id = ${userId};`
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  postUpload,
  allPosts,
  postChange,
  postDeleting,
  getUserPosts,
};
