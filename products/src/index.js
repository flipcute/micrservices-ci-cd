const express = require("express");
require("dotenv").config();
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const { CreateChannel } = require("./utils");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const channel = await CreateChannel();

  await expressApp(app, channel);

  app.get("/", (req, res) => {
    res.send("hellowww");
  });

  app
    .listen(PORT, () => {
      console.log(`Products listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
