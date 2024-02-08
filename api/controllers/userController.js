const bcryptjs = require("bcryptjs");

const User = require("../models/userModel");
const Listing = require("../models/listModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.test = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello World",
  });
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new AppError("You can only update your own account", 401));

  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  );

  req.body.password = undefined;
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(new AppError("You can only delete your own acount!", 401));
  await User.findByIdAndDelete(req.user.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getUserListings = catchAsync(async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(new AppError("You can only delete your own acount!", 401));

  const listings = await Listing.find({ userRef: req.user.id });

  res.status(200).json({
    status: "success",
    data: {
      listings,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("User Not Found!", 404));

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
