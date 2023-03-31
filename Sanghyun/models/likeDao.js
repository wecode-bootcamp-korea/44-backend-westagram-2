const appDataSource = require("./myDataSources");

const createLike = async ({ userId, postId }) => {
  await appDataSource.query(
    `INSERT INTO likes( 
        user_id,
        post_id
         ) VALUES (?, ?);
      `,
    [userId, postId]
  );
};
const deleteLike = async ({ userId, postId }) => {
  await appDataSource.query(
    `
    DELETE
    FROM likes
    WHERE user_id = ? AND post_id = ?
`,
    [userId, postId]
  );
};

const findMatched = async ({ userId, postId }) => {
  const result = await appDataSource.query(
    `SELECT * FROM likes WHERE user_id =? AND post_id =?`,
    [userId, postId]
  );
  return result;
};

module.exports = {
  createLike,
  deleteLike,
  findMatched,
};
