const logs = function(req, res, next) {
  console.log("Method:", req.method, "On route:", req.originalUrl);
  if (req.body) {
    console.log("payload:", req.body);
  }
  next();
};

module.exports = logs;
