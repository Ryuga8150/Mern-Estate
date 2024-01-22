const Listing = require("../models/listModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      listing,
    },
  });
});

exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(new AppError("Listing not Found!", 404));

  if (req.user.id !== listing.userRef)
    return next(new AppError("You can only delete your own listings!", 401));

  await Listing.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
  });
});

exports.updateListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(new AppError("Listing not Found!", 404));

  if (req.user.id !== listing.userRef)
    return next(new AppError("You can only delete your own listings!", 401));

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      listing: updatedListing,
    },
  });
});

exports.getListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(new AppError("No listing exists with that id"));

  res.status(200).json({
    status: "success",
    data: {
      listing,
    },
  });
});
