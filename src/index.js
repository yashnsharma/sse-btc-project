const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const CronJob = require("cron").CronJob;
const { addPriceRecord } = require("./controller/controller");
require("dotenv").config({ override: true });

const dbport = process.env.MDBPORT ? process.env.MDBPORT : 30000;
const appport = process.env.PORT ? process.env.PORT : 8080;

var job = new CronJob(
  process.env.CRONEXPN,
  () => addPriceRecord(),
  null,
  true,
  process.env.CRONTZ
);

const app = express();

mongoose
  .connect(`mongodb://localhost:${dbport}/coindb`, {})
  .then(() => {
    console.log("mongodb server connected");
  })
  .catch((e) => {
    console.log("mongodb server disconnected due to error " + e);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

job.start();

routes(app);

app.get("/", (req, res) => res.send("BTC Project"));
app.listen(appport, () => console.log("btc app running on port " + appport));
