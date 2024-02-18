const Listing = require("../models/listModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createListing = catchAsync(async (req, res, next) => {
  console.log(req.body);
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

exports.getListings = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 9;
  const startIndex = req.query.startIndex * 1 || 0;
  // console.log(req.query);
  // console.log(JSON.parse(req.query));
  // console.log(offer);
  let { offer, furnished, parking, type } = req.query;
  if (offer === undefined || offer === "false") {
    offer = { $in: [false, true] };
  }

  if (furnished === undefined || furnished === "false") {
    furnished = { $in: [false, true] };
  }

  if (parking === undefined || parking === "false") {
    parking = { $in: [false, true] };
  }

  if (type === undefined || type === "all") {
    type = { $in: ["sell", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";

  const queryObj = {
    searchTerm,
    offer,
    furnished,
    parking,
    type,
  };
  console.log("Query Object", queryObj);

  const listings = await Listing.find({
    name: { $regex: searchTerm, $options: "i" },
    offer,
    furnished,
    parking,
    type,
  })
    .sort({ [sortBy]: order })
    .limit(limit)
    .skip(startIndex);

  // if (!listings) return next(new AppError("No Listings Found"));
  res.status(200).json({
    status: "success",
    results: listings.length,
    data: {
      listings,
    },
  });
});
