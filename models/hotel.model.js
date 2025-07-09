import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: [true, "Please enter the Hotel name"],
    },
    hotelDescription: {
      type: String,
      required: [true, "Please enter hotel description"],
    },
    hotelLocation: {
      type: String,
      required: [true, "Please enter the location"],
    },
    hotelGmaps: {
      type: String,
      required: false,
    },
    hotelImage: {
      type: [String],
      required: false,
      default: [],
    },
    hotelPrice: {
      type: Number,
      required: [true, "Please enter room prices"],
    },
    hotelContact:{
      type: Number,
      required: [true, "Please enter contact number"],
    },
    hotelCountry:{
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
