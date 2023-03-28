const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require("dotenv")
dotenv.config()

const routes = require("./routes")

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.status(200).json({"message" : "pong"});
})

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = () => {
    try {
      server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
    } catch (err) {
      console.error(err);
    }
  };
  
  start();