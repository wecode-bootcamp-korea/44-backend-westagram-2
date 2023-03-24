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

app.patch("/user/post/modify", async (req, res) => {
  const { userId, postId, contentUpdate } = req.body;
  // const { contentUpdate } = req.body;
  const rows = await appDataSource.query(
    `UPDATE
          posts 
          SET content=?
          WHERE users.id=? AND posts.id=?
          `,
    [contentUpdate, userId, postId]
  );
  res.status(201).json({ data: rows });
  // const rows = await appDataSource.query(
  //   `SELECT
  //         users.id as userId,
  //         users.name as userName,
  //         posts.user_id as postingId,
  //         posts.title as postingTitle,
  //         posts.content as postingContent
  //         FROM users
  //         JOIN posts
  //         ON users.id = posts.id
  //         WHERE users.id = ?
  //         `,
  //   [userId]
  // );
  // res.status(201).json({ data: rows });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
