const dataSource = require('./appDataSource');

const createUser = async (name, email, password, profileImage) => {
  try {
    return await dataSource.appDataSource.query(
      `INSERT INTO users(
                  name,
                  email,
                  password,
                  profile_image
              ) VALUES (?, ?, ?, ?)`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getUserPosts = async (userId) => {
  try {
    return await dataSource.appDataSource.query(
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
  createUser,
  getUserPosts,
};
