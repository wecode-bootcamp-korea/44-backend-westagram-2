require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(routes);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

/*app.post('/posts', async (req, res) => {
  const { title, content, userId } = req.body;

  //에러 핸들링 추가 - status code 잘 쓰는 것도 중요

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
*/

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
