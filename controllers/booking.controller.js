import { Booking } from "../models/index.js";

const insertBookingData = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("bookedUserId")
      .populate("bookedFlightId")
      .populate("bookedVehicleId")
      .populate("bookedHotelId");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return req.status(404).json({ message: "Booking not available" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const checkBooking = await Booking.findById(id);
    if (!checkBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking information deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookings = await Booking.find({ bookedUserId: userId })
      .populate("bookedUserId")
      .populate("bookedFlightId")
      .populate("bookedHotelId")
      .populate("bookedVehicleId");

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { insertBookingData, getBookings, deleteBooking, getSingleBooking, getUserBookings };
