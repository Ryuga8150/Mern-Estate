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
  // console.log("In Signup");
  const newUser = await User.create(req.body);
  // const newUser = "no";
  createSendToken(newUser, 200, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  // console.log("In signin");
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError("No User exists with that Email", 404));

  // console.log(user);
  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError("Invalid Credentials", 401));

  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

const generatePassword = function (digits) {
  return Math.random().toString(36).slice(-digits);
};

exports.google = catchAsync(async (req, res, next) => {
  const { name, email, photo } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // console.log("User exists");
    createSendToken(user, 200, res);
  } else {
    // we have set password as required in model
    // so for signin with google we generate a random password for user
    // which later can be changed by the user if he wants

    // 36 means numbers from 0 to 9 and from 'A' to 'Z' characters
    // console.log("Creating User");
    const generatedPassword = generatePassword(8) + generatePassword(8);
    // -8 for last 8 digits. 16 character password which is very secure

    const newUser = await User.create({
      username: name.split(" ").join("").toLowerCase() + generatePassword(4),
      email,
      password: generatedPassword,
      avatar: photo,
    });
    // console.log(newUser);
    createSendToken(newUser, 200, res);
  }
});

exports.isLoggedIn = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      loggedIn: true,
    },
  });
};
