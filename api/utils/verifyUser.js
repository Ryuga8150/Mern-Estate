const AppError = require("./appError");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(new AppError("Unauthorized", 401));
  // console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new AppError(403, "Forbidden"));
    req.user = user;
    next();
  });
};
