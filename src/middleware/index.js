const auth = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    res.status(401).json({ status: "failed", message: "Unauthorized" });
  }

  req.user = user;

  next();
};

module.exports = { auth };
