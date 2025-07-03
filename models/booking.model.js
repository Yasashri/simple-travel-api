import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    bookedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id must be present"],
    },
    bookedFlightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: false,
    },
    bookedHotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: false,
    },
    bookedVehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: false,
    },

    // Details of the flight bookings

    flightNoOfSeats: {
      type: Number,
      min: 1,
      required: false,
    },
    flightClass: {
      type: String,
      required: false,
    },
    flightDate: {
      type: Date,
      required: false,
    },
    flightReturn: {
      type: Date,
      required: false,
    },
    flightTime: {
      type: String,
      required: false,
    },
    flightTotalPrice: {
      type: Number,
      required: false,
    },

    // Details for Hotel bookings
    hotelDate: {
      type: Date,
      required: false,
    },
    hotelDays: {
      type: Number,
      min: 1,
      required: false,
    },
    hotelTotalPrice: {
      type: Number,
      required: false,
    },

    // Details for vehicle bookings

    vehicleBookedDate: {
      type: Date,
      required: false,
    },
    vehicleBookedTime: {
      type: String,
      required: false,
    },
    vehicleBookedTotalPrice: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
