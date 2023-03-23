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

app.get("/ping", cors(), function (req, res, next) {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
