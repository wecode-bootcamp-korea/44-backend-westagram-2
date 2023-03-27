const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Sourece has been initialized!");
  })
  .catch((error) => {
    console.log("Alert Error. Need modify!", error);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//health check
app.get("/ping", cors(), function (req, res, next) {
  res.status(200).json({ message: "pong" });
});

// 유저 회원 가입하기
app.post("/users", async (req, res) => {
  const { id, userProfileImage, userName, age, email } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
		    id,
        profile_image,
        username,
        age,
        email
		) VALUES (?, ?, ?, ?, ?);
		`,
    [id, userProfileImage, userName, age, email]
  );
  res.status(201).json({ message: "userCreated" });
});

// 게시글 등록하기 api
app.post("/posts", async (req, res) => {
  const { postingId, title, postingImageUrl, postingContent, userId } =
    req.body;

  await appDataSource.query(
    `INSERT INTO posts(
		    id,
        title,
        posting_image_url,
        posting_content,
        user_id
      
		) VALUES (?, ?, ?, ?, ?);
		`,
    [postingId, title, postingImageUrl, postingContent, userId]
  );
  res.status(201).json({ message: "postCreated" });
});

// 좋아요 누르기
app.post("/likes", async (req, res) => {
  const { userId, postId } = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
      user_id,
      post_id
    ) VALUES (?, ?);
    `,
    [userId, postId]
  );
  return res.status(201).json({ message: "likeCreated" });
});

// 전체 게시글 조회하기
app.get("/e_posts", async (req, res) => {
  await appDataSource.query(
    `SELECT
		    users.id,
        users.profile_image,
        posts.id,
        posts.posting_image_url,
        posts.posting_content

		FROM users ba
    INNER JOIN users ON ba.id = users.id
    INNER JOIN posts ON ba.id = posts.id
		`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

// 유저의 게시글 조회하기
app.get("/u_posts", async (req, res) => {
  const { userId } = req.body;

  const userspost = await appDataSource.query(
    `SELECT
		  users.id as userID,
      users.profile_image as userProfileimage,
      JSON_ARRAYAGG(
          JSON_OBJECT(
           "postingId", posts.user_id,
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

  res.status(200).json({ data: userspost });
});

// 게시글 수정하기
app.patch("/posts", async (req, res) => {
  const { postingUserId, postingContent } = req.body;
  await appDataSource.query(
    `UPDATE
        posts
    SET
        posting_content = ?
    WHERE
        posts.user_id = ? 
    `,
    [postingContent, postingUserId]
  );

  const userspost = await appDataSource.query(
    `SELECT
        users.id as userId,
        users.username as userName,
        posts.id as postingId,
        posts.title as postingTitle,
        posts.posting_content as postingContent
    
    FROM 
        users
    LEFT JOIN posts
    ON users.id = posts.user_id
    `
  );

  return res.status(201).json({ data: userspost });
});

// 게시글 삭제하기
app.delete("/posts/:postingId", async (req, res) => {
  const { postingId } = req.params;
  await appDataSource.query(
    `DELETE
     FROM
        posts
     WHERE
        posts.id = ?
    `,
    [postingId]
  );
  res.status(204).send();
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
