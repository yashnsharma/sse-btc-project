const { createUser, getUser, login } = require("../controller/authController");
const { auth } = require("../middleware");
const {
  getAllCoins,
  setUserInfo,
  getSingleCoin,
  createCoin,
  updateCoin,
  deleteCoin,
} = require("../controller/controller");
const express = require("express");
const router = express.Router();

router.route("/prices/btc").get(getAllCoins);
router.route("/user/info").post(auth, setUserInfo);
router.route("/user").post(auth, createUser);
router.route("/user/:id").get(auth, getUser);
router.route("/user/login").post(login);
router
  .route("/coin/:id")
  .get(auth, getSingleCoin)
  .patch(auth, updateCoin)
  .delete(auth, deleteCoin);
router.route("/coin").post(auth, createCoin);

module.exports = router;
