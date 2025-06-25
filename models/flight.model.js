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
    flightBasePrice: {
      type: Number,
      required: [true, "Please enter ticket price"],
    },
    flightDate: {
      type: Date,
      required: [true, "Please enter flight date"],
      default: () => {
        // Random date within next 30 days
        const today = new Date();
        const daysToAdd = Math.floor(Math.random() * 30);
        today.setDate(today.getDate() + daysToAdd);
        return today;
      },
    },
    flightTime: {
      type: String,
      required: [true, "Please enter flight time"],
      default: () => {
        // Random time between 00:00 and 23:59
        const hour = Math.floor(Math.random() * 24)
          .toString()
          .padStart(2, "0");
        const minute = Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0");
        return `${hour}:${minute}`;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
