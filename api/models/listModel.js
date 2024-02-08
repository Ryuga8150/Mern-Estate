const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A listing must have a name"],
    },
    description: {
      type: String,
      required: [true, "A listing must have a description"],
    },
    address: {
      type: String,
      required: [true, "A listing must have an address"],
    },
    regularPrice: {
      type: Number,
      min: [1, "A listing price must be >= 1"],
      required: [true, "A listing must have a price"],
    },
    discountPrice: {
      type: Number,
      min: [0, "A listing discount price must not be < 1"],
      validate: {
        validator: function (val) {
          return val < this.regularPrice;
        },
        message: "Discount Price must be less than Regular Price",
      },
      // required: true,
    },
    bathrooms: {
      type: Number,
      required: [true, "A listing must specify the number of bathrooms"],
    },
    bedrooms: {
      type: Number,
      required: [true, "A listing must specify the number of bedrooms"],
    },
    furnished: {
      type: Boolean,
      required: [true, "A listing must specify whether it's furnished or not"],
    },
    parking: {
      type: Boolean,
      required: [true, "A listing must specify whether it has parking or not"],
    },
    type: {
      type: String,
      required: [true, "A listing must have a type"],
      enum: ["rent", "sell"],
      message: "Type is either rent or sell",
    },
    offer: {
      type: Boolean,
      // required: [true, "A listing must have an offer"],
    },
    imageUrls: {
      type: Array,
      required: [true, "A listing must have images"],
    },
    userRef: {
      type: String,
      required: [true, "A listing must belong to an existing user"],
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listSchema);

module.exports = Listing;
