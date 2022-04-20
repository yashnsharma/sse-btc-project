const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const CronJob = require("cron").CronJob;
const cors = require("cors");
const { addPriceRecord } = require("./controller/controller");
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB,
  MONGO_PORT,
  REDIS_URL,
  REDIS_SECRET,
} = require("../config/config");

const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({
  url: REDIS_URL,
  legacyMode: true,
});
redisClient.connect().catch(console.error);

require("dotenv").config({ override: true });

const mongo_uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_DB}:${MONGO_PORT}/?authSource=admin`;
const appport = process.env.PORT ? process.env.PORT : 8080;

var job = new CronJob(
  process.env.CRONEXPN,
  () => addPriceRecord(),
  null,
  true,
  process.env.CRONTZ
);

const app = express();

const connectWithRetry = () => {
  mongoose
    .connect(mongo_uri, {})
    .then(() => {
      console.log("mongodb server connected");
    })
    .catch((e) => {
      console.log("mongodb server disconnected due to error " + e);
      console.log(
        "------------------RETRYING IN 5 SECONDS-----------------------"
      );
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.enable("trust proxy");
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: REDIS_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUnilitialized: false,
      httpOnly: true,
      maxAge: 300000,
    },
  })
);

job.start();

app.use("/api/v1", router);

app.get("/api/v1/home", (req, res) => res.send("BTC Projects"));
app.listen(appport, () => console.log("btc app running on port " + appport));
