require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const appDataSource = require('./models/appDataSource');
const loginReq = require('./utils/auth');

const app = express();
const PORT = process.env.PORT;

//app.use가 middleware를 등록하는 거임
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(routes);
app.use(loginReq);
//loginRequired라는 middleware를 app.use로 등록해주기
//routes 다음에 있어야 원하는 endpoint에만 login요청 할 수 있음, 앞에 있으면 모든 endpoint에 대해 확인하게 됨

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

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
