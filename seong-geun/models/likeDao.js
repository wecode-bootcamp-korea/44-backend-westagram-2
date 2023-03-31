const appDataSource = require("./appDataSource");

// 좋아요 누르기
const createLike = async (userId, postId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO likes(
        user_id,
        post_id
        
		) VALUES (?, ?);
		`,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createLike,
};
