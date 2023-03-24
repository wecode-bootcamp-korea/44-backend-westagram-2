require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

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
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.post('/users', async (req, res) => {
  const { name, email, password, profileImage } = req.body;
  await appDataSource.query(
    `INSERT INTO users (
      name,
      email,
      password,
      profile_image
    ) VALUES (?, ?, ?, ?)`,
    [name, email, password, profileImage]
  );
  res.status(201).json({ message: 'userCreated' });
});

app.post('/posts', async (req, res) => {
  const { title, content, userId } = req.body;
  const insert = await appDataSource.query(
    `INSERT INTO posts (
      title,
      content,
      user_id
    ) VALUES (?, ?, ?)`,
    [title, content, userId]
  );
  res.status(201).json({ message: 'postCreated' });
});

app.get('/posts', async (req, res) => {
  const data = await appDataSource.query(
    `SELECT
      u.id userId,
      u.profile_image userProfileImage,
      p.id postingId,
      p.image_url postingImageUrl,
      p.content postingContent
    FROM posts p
    JOIN users u ON p.user_id = u.id`
  );
  res.status(200).json({ data });
});

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const data = await appDataSource.query(
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
  res.status(200).json({ data });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
