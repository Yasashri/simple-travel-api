import mongoose from "mongoose";

const flightSchema = mongoose.Schema(
  {
    flightNo: {
      type: String,
      required: [true, "Please enter flight number"],
    },
    flightStart: {
      type: String,
      required: [true, "Please enter start location"],
    },
    flightEnd: {
      type: String,
      required: [true, "Please enter the destination"],
    },
    flightModel: {
      type: String,
      required: [true, "Please enter flight model"],
    },
    flightImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
