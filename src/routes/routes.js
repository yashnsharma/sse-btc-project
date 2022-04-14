const { getAllCoins, setUserInfo } = require("../controller/controller");

const routes = (app) => {
  app.route("/api/prices/btc").get(getAllCoins);
  app.route("/user/info").post(setUserInfo);
};

module.exports = routes;
