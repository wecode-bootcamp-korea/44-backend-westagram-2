require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const appDataSource = require("./models/appDataSource");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

//health check
app.get("/ping", function (req, res, next) {
  res.status(200).json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, async () => {
      await appDataSource
        .initialize()
        .then(() => {
          console.log("Data Source has been initialized!");
        })
        .catch((err) => {
          console.error(
            "Error occurred during Data Source initialization",
            err
          );
          appDataSource.destroy();
        });

      console.log(`Server is listening on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
