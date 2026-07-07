module.exports = (req, res, next) => {
  req.auth = {
    userId: "demo-user",
  };

  next();
};