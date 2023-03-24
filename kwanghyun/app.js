const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

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
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.err("Initialize Error", err);
  });
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});
app.get("/posts/list", async (req, res) => {
  const rows = await appDataSource.query(
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
  res.status(200).json({ data: rows });
});
app.get("/user/posts", async (req, res) => {
  const { userId } = req.body;
  const rows = await appDataSource.query(
    `SELECT
              users.id as userId,
              users.profile_image as userProfileImage,
              (SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  "postingId", posts.id, 
                  "postingContent", posts.content
                  )
                )) as postings
              FROM posts
              INNER JOIN users
              ON users.id = posts.user_id
              WHERE posts.user_id = ?
              GROUP BY posts.user_id
              `,
    [userId]
  );
  res.status(200).json({ data: rows });
});

app.post("/posts", async (req, res) => {
  const { title, content, user_id } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
            title,
            content,
            user_id
    ) VALUES (?,?,?);
    `,
    [title, content, user_id]
  );
  res.status(201).json({ message: "postCreated" });
});

app.post("/users", async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `INSERT INTO users(
            name,
            email,
            profile_image,
            password
  ) VALUES (?, ?, ?, ?);
  `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "userCreated" });
});
app.post("/likes", async (req, res) => {
  const { user_id, post_id } = req.body;
  await appDataSource.query(
    `INSERT INTO likes(
        user_id,
        post_id
      ) VALUES (?, ?)
      `,
    [user_id, post_id]
  );
  res.status(201).json({ message: "likeCreated" });
});

app.patch("/user/post/modify", async (req, res) => {
  const { postId, contentUpdate } = req.body;
  await appDataSource.query(
    `UPDATE
          posts 
          SET content=?
          WHERE posts.user_id=?
          `,
    [contentUpdate, postId]
  );
  const data = await appDataSource.query(
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
  res.status(201).json({ data: data });
});

app.delete("/posts/delete", async (req, res) => {
  const { contentDelete } = req.body;
  await appDataSource.query(
    `DELETE 
            FROM posts
            WHERE posts.id = ?
    `,
    [contentDelete]
  );
  res.status(200).json({ message: "postingDeleted" });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
