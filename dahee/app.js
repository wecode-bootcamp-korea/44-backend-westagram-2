const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { DataSource } = require('typeorm');

require('dotenv').config();

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
    appDataSource.destroy();
  });

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Assgnmnt2. 회원가입
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
