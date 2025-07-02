import { Flight } from "../models/index.js";

// Base URL for image access
const BASE_URL = "http://localhost:5000"; // change port as needed

const insertFlightData = async (req, res) => {
  try {
    const flightData = { ...req.body };

    // If image was uploaded, set the URL in flightData
    if (req.file) {
      flightData.flightImage = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    const flight = await Flight.create(flightData);
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If image uploaded, update flightImage field
    if (req.file) {
      updateData.flightImage = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    const flight = await Flight.findByIdAndUpdate(id, updateData, {
      new: true, // return the updated document
    });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    await Flight.findByIdAndDelete(id);
    res.status(200).json({ message: "Flight information deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
  insertFlightData,
};
