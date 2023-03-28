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

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
