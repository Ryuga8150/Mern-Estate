const jwt = require("jsonwebtoken");

const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // so that no third party can acccess
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  console.log("In Signup");
  const newUser = await User.create(req.body);
  // const newUser = "no";

  console.log(newUser);

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  console.log("In signin");
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError("No User exists with that Email", 404));

  console.log(user);
  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError("Invalid Credentials", 401));

  createSendToken(user, 200, res);
});
