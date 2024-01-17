const Listing = require("../models/listModel");
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
