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
        userProfileImage,
        userName,
        age,
        email
		) VALUES (?, ?, ?, ?, ?);
		`,
    [id, userProfileImage, userName, age, email]
  );
  res.status(201).json({ message: "userCreated" });
});

// 게시글 등록하기
app.post("/posts", async (req, res) => {
  const { postingId, title, postingImageUrl, postingContent } = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
		    postingId,
        title,
        postingImageUrl,
        postingContent
      
		) VALUES (?, ?, ?, ?);
		`,
    [postingId, title, postingImageUrl, postingContent]
  );
  res.status(201).json({ message: "postCreated" });
});

// 전체 게시글 조회하기
app.get("/e_posts", async (req, res) => {
  await appDataSource.query(
    `SELECT
		    users.id,
        users.last_name,
        posts.postImage,
        posts.postContent
		FROM users ba
    INNER JOIN users ON ba.id = users.id
    INNER JOIN posts ON ba. id = posts.id
		`,
    (err, rows) => {
      res.status(201).json(rows);
    }
  );
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
