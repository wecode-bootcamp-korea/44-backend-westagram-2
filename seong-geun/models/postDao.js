const appDataSource = require("./appDataSource");

// 게시글 등록하기
const createPost = async (title, postingImageUrl, postingContent, userId) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
		    title,
        posting_image_url,
		    posting_content,
        user_id
		) VALUES ( ?, ?, ?, ?);
		`,
      [title, postingImageUrl, postingContent, userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

// 전체 게시글 조회하기
const getEposts = async () => {
  try {
    return await appDataSource.query(
      `SELECT
          users.id,
          users.profile_image,
          posts.id,
          posts.posting_image_url,
          posts.posting_content
  
      FROM users ba
          INNER JOIN users ON ba.id = users.id
          INNER JOIN posts ON ba.id = posts.id
      `
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

// 유저의 게시글 조회하기
const getUposts = async (userId) => {
  try {
    return await appDataSource.query(
      `SELECT
        users.id as userID,
        users.profile_image as userProfileimage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "postingID", posts.user_id,
            "postingImageUrl", posts.posting_image_url,
            "postingContent", posts.posting_content
            )
         )as postings
        FROM users
        JOIN posts
        ON users.id = posts.user_id
        WHERE users.id = ?
        `,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

// 게시글 수정하기
const patchPosts = async (postingContent, postingUserId) => {
  try {
    return await appDataSource.query(
      `UPDATE
          posts
       SET
          posting_content = ?
       WHERE
          posts.user_id = ?
    `,
      [postingContent, postingUserId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

// 게시글 삭제하기
const deletePosts = async (postingId) => {
  try {
    const deletPost = await appDataSource.query(
      `  DELETE
         FROM
            posts
         WHERE
            posts.id = ?
      `,
      [postingId]
    );
    return deletPost;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    console.log(err);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  getEposts,
  getUposts,
  patchPosts,
  deletePosts,
};
