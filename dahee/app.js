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

app.patch('/posts/:userId/:postId/', async (req, res) => {
  const { userId, postId } = req.params;
  const { title, content } = req.body;
  await appDataSource.query(
    `UPDATE posts   
    SET
      title = ?,
      content = ? 
    WHERE user_id = ${userId} AND id = ${postId};`,
    [title, content]
  );

  const updatedPost = await appDataSource.query(
    `SELECT 
        p.user_id userId,
        u.name userName,
        p.id postingId,
        p.title postingTitle,
        p.content postingContent
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ${userId} AND p.id = ${postId}`
  );
  res.status(200).json({ updatedPost });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
