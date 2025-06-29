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
    const booking = await Booking.find({});
    res.status(200).json(booking);
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

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, req.body);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      const updatedBooking = await Booking.findById(id);
      res.status(200).json(updatedBooking);
    }
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

export {
  insertBookingData,
  updateBooking,
  getBookings,
  deleteBooking,
  getSingleBooking,
};
