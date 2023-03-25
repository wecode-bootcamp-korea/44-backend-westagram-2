//code 짜기 전에 sql문으로 db구축 먼저 하는 게 순서에 맞음

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

  //필요한 데이터가 다 오지 않은 경우에 대한 error handling
  //try catch 써야 하는 경우가 있고, if로 하는 경우가 있는데, 내가 예측 가능한 에러면 if가 나음
  if (!email || !password || !name)
    return res.status(400).json({ message: 'KEY_ERROR' });

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

//***함수의 결과의 첫번째 인덱스를 const [post]에 담을 때, 배열이면 배열에서 풀리고 객체로 감
//let a = [1,2,3] const [x,y] =a console.log(x) > 1, console.log(y) > 2
//?는 mysql2가 지원하는 기능임, ${}보다 ? [] 페어를 더 권장함 ({} 객체로 만들어서 쓰기도 함)

//Asgmt5 - end point '/users/posts?userId=1' 쿼리 파라미터, GET 메서드의 body 역할
//query parameter는 프론트가 맘대로 넣을 수 있음, 모두 다 string으로 옴
//table 별칭은 이름 initial로 많이 지음
//Group By 생략될 때도 있음
//subquery는 안 쓸 수 있으면 안 쓰는 게 좋음, 한 번 더 query 호출해야 하니까
//APPLICATION JOIN은 객체 키의 value로 정의, 객체.key = value(다른 table)

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
