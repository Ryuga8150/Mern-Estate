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

const getObjectFromArray = function (benefits, word) {
  let obj = {};

  benefits.map((field) => {
    obj[word + "." + field] = true;
  });

  return obj;
};
exports.getListings = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 9;
  const startIndex = req.query.startIndex * 1 || 0;
  const searchTerm = req.query.searchTerm || "";
  const sortBy = req.query.sortBy || "createdAt";
  const sortOrder = req.query.order || "desc";
  const price = req.query.price || "[0,100000000]";
  const [min, max] = JSON.parse(price);
  const typeChoices = (req.query.type || "rentAndsale").split("And");

  const benefits = req.query.benefits || "[]";
  // console.log(JSON.parse(benefits));
  const benefitsObj = getObjectFromArray(JSON.parse(benefits), "benefits");
  console.log(benefitsObj);

  const facilities = req.query.facilities || "[]";
  const facilitiesObj = getObjectFromArray(
    JSON.parse(facilities),
    "facilities"
  );

  const discount = req.query.discount || "[]";
  const discountArr = JSON.parse(discount);

  let minmDiscount = 100;
  let maxmDiscount = 100;
  discountArr.forEach((str) => {
    const [symbol, val] = str.split("ThanOrEqualTo");
    if (symbol === "less") maxmDiscount = 10;
    else minmDiscount = val * 1 < minmDiscount ? val * 1 : minmDiscount;
    // console.log();
  });

  if (minmDiscount === 100) minmDiscount = 0;
  console.log(JSON.parse(discount));
  console.log(minmDiscount);

  console.log(req.query);

  // const listings = await Listing.find({
  //   name: { $regex: searchTerm, $options: "i" },
  //   type: {
  //     $in: typeChoices,
  //   },
  //   regularPrice: {
  //     $lte: max,
  //     $gte: min,
  //   },
  //   ...benefitsObj,
  //   ...facilitiesObj,
  // })
  //   .limit(limit)
  //   .sort({ [sortBy]: sortOrder })
  //   .skip(startIndex);

  const listings = await Listing.aggregate([
    {
      $match: {
        name: { $regex: searchTerm, $options: "i" },
        type: {
          $in: typeChoices,
        },
        regularPrice: {
          $lte: max,
          $gte: min,
        },
        ...benefitsObj,
        ...facilitiesObj,
        discount: {
          $lte: maxmDiscount,
          $gte: minmDiscount,
        },
      },
    },
    {
      $addFields: {
        price: {
          $subtract: [
            "$regularPrice",
            {
              $divide: [{ $multiply: ["$regularPrice", "$discount"] }, 100],
            },
          ],
        },
      },
    },
    {
      $limit: limit,
    },
    {
      $sort: { [sortBy]: sortOrder === "desc" ? -1 : 1 },
    },
    {
      $skip: startIndex,
    },
  ]);
  // if (!listings) return next(new AppError("No Listings Found"));
  res.status(200).json({
    status: "success",
    results: listings.length,
    data: {
      listings,
    },
  });
});
