const appDataSource = require("./myDataSources");

const createPost = async ({ title, content, userId, postingImageUrl }) => {
  await appDataSource.query(
    `INSERT INTO posts(
        title,
        content,
        user_id,
        posting_image_url
      ) VALUES (?, ?, ?, ?);
       `,
    [title, content, userId, postingImageUrl]
  );
};

const postingList = async () => {
  return await appDataSource.query(
    `SELECT  
          u.id AS userId,
          u.profile_image AS userProfileImage,
          p.id AS postingId,
          p.posting_image_url AS postingImageUrl,
          p.content AS postingContent  
    
          FROM users AS u
          JOIN posts AS p
          ON p.user_id = u.id
          `
  );
};

const postingListByUserId = async (userId) => {
  const postings = await appDataSource.query(
    `SELECT 
            u.id AS userId,
            u.profile_image AS userProfileImage,
            JSON_ARRAYAGG(
              JSON_OBJECT(
                "postingId", p.id,
                "postingImageUrl", p.posting_image_url,
                "postingContent" , p.content
              )
            ) AS postings
          FROM 
            users AS u            
            JOIN posts AS p
            ON  p.user_id = u.id 
          WHERE 
            u.id = ?
          GROUP BY 
            u.id
          `,
    [userId]
  );
  return postings[0];
};

const findMatched = async (postId) => {
  const result = await appDataSource.query(`SELECT * FROM posts WHERE id = ?`, [
    postId,
  ]);
  return result;
};

const deletePost = async (postId) => {
  await appDataSource.query(
    `
        DELETE
        FROM posts AS p
        WHERE p.id = ? 
      `,
    [postId]
  );
};

const patchPost = async ({ postId, title, content, postingImageUrl }) => {
  await appDataSource.query(
    `
        UPDATE posts 
        SET 
          title = ?,
          content = ?,
          posting_image_url = ?
        WHERE posts.id =? 
        
        `,
    [title, content, postingImageUrl, postId]
  );
};

const postingPatched = async (postId) => {
  const result = await appDataSource.query(
    `SELECT  
        JSON_ARRAYAGG(
            JSON_OBJECT(
              "userId", u.id,
                "userName", p.posting_image_url,
                "postingId" , p.id,
                "postingTitle", p.title,
                "postingContent", p.content
              )
          ) AS patchedData    
        FROM 
          users AS u            
          JOIN posts AS p
           ON  p.user_id = u.id         
        WHERE p.id =? 
        `,
    [postId]
  );
  if (result === undefined) {
    return null;
  }

  return result;
};

module.exports = {
  createPost,
  postingList,
  postingListByUserId,
  deletePost,
  findMatched,
  patchPost,
  postingPatched,
};
