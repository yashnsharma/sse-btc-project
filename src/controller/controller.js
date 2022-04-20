const coin = require("../model/coin");
const axios = require("axios");
const apiEndpoint =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
const localEndpoint =
  "http://localhost:8000/api/prices/btc?date=29-03-2022&offset=0&limit=100";
const mailer = require("./mailer");
const moment = require("moment");

const getAllCoins = async (req, res) => {
  const reqQuery = req.query;
  const dbQuery = {};
  let responseBody = {
    url: new URLSearchParams(localEndpoint),
    next: new URLSearchParams(localEndpoint),
    count: null,
    data: null,
  };

  if (reqQuery.date) {
    responseBody.url.set("date", reqQuery.date);
    responseBody.next.set("date", reqQuery.date);
    dbQuery.timestmap = { timestamp: { $lte: reqQuery.date } };
  }

  if (reqQuery.limit) {
    responseBody.url.set("limit", reqQuery.limit);
    responseBody.next.set("limit", reqQuery.limit);
    dbQuery.limit = parseInt(reqQuery.limit);
  }

  if (reqQuery.offset) {
    let nextOffset = parseInt(reqQuery.offset) + parseInt(reqQuery.offset);
    responseBody.url.set("offset", reqQuery.offset);
    responseBody.next.set("offset", nextOffset.toString());
    dbQuery.offset = parseInt(reqQuery.offset);
  }

  try {
    const allCoins = await coin
      .find(dbQuery.timestmap ? dbQuery.timestmap : null, { _id: 0, __v: 0 })
      .skip(dbQuery.offset)
      .limit(dbQuery.limit);
    responseBody.url = decodeURIComponent(responseBody.url);
    responseBody.next = decodeURIComponent(responseBody.next);
    responseBody.count = allCoins.length;
    responseBody.data = allCoins;

    res.status(200).send(JSON.stringify(responseBody));
  } catch (e) {
    res.status(400).send("Couldn't get all Coins");
  }
};

const setUserInfo = (req, res) => {
  try {
    process.env.USR_EMAIL = req.body.email;
    process.env.USR_MIN = req.body.min;
    process.env.USR_MAX = req.body.max;
    res.status(200).send("Updated User Info successfully");
  } catch (e) {
    res.status(500).send("Failed to update User Info " + e);
  }
};

const addPriceRecord = async () => {
  console.log("attempting price fetch");
  const priceResponse = await axios.get(apiEndpoint);
  const price = priceResponse.data.bitcoin.usd;

  if (!priceResponse) {
    return false;
  }

  if (price < process.env.USR_MIN || price > process.env.USR_max) {
    mailer(process.env.USR_EMAIL, "BTC PRICE MOVED");
  }

  const coinRecord = new coin({
    coin: "bitcoin",
    price: price,
    timestamp: moment(new Date()).format("DD-MM-YYYY"),
  });

  try {
    await coinRecord.save();
  } catch (e) {
    console.log("record save failed " + e);
  }
};

// CRUD

const getSingleCoin = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await coin.findById(id);

    if (!result) {
      return res.status(404).json({
        status: "failed",
        message: "Sorry, Could not find requested coin",
      });
    }

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "Failed to get coin due to : " + e,
    });
  }
};

const createCoin = async (req, res) => {
  const body = req.body;
  const newCoin = new coin(body);

  try {
    const result = await newCoin.save();

    if (!result) {
      throw Error("Couldn't create coin");
    }

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "Failed to create coin due to : " + e,
    });
  }
};

const updateCoin = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const result = await coin.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      throw Error("Couldn't Update coin");
    }

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "Failed to update coin due to : " + e,
    });
  }
};

const deleteCoin = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await coin.findByIdAndDelete(id);

    if (!result) {
      throw Error("Couldn't Delete coin");
    }

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "Failed to delete coin due to : " + e,
    });
  }
};

module.exports = {
  getAllCoins,
  addPriceRecord,
  setUserInfo,
  getSingleCoin,
  createCoin,
  updateCoin,
  deleteCoin,
};
