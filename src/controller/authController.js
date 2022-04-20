const user = require("../model/user");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    //   const hashPassword = await bcrypt.hash(password);
    const newUser = new user({ username, password: hashPassword });

    const result = await newUser.save();

    if (!result) {
      throw Error("There was an error trying to save User");
    }

    req.session.user = newUser;

    return res
      .status(200)
      .json({ status: "success", message: "User Saved Successfully" });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "User save unsuccessful due to : " + e,
    });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await user.findById(id);

    if (!result) {
      return res
        .send(404)
        .json({ status: "failed", message: "Sorry, Requested user Not Found" });
    }

    return res.status(200).json({ status: "success", data: result });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "User save unsuccessful due to : " + e,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = await user.findOne({ username: username });
    if (!getUser) {
      throw Error("User not found");
    }

    const validPassword = bcrypt.compare(password, getUser.password);

    if (validPassword) {
      req.session.user = getUser;
      res.status(200).json({
        status: "success",
      });
    } else {
      throw Error("Password Incorrect");
    }

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: "An error occured, " + e,
    });
  }
};

module.exports = { createUser, getUser, login };
