import { Flight } from "../models/index.js";

const BASE_URL = "http://localhost:5000";

const insertFlightData = async (req, res) => {
  try {
    const flightData = { ...req.body };

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

    if (req.file) {
      updateData.flightImage = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    const flight = await Flight.findByIdAndUpdate(id, updateData, {
      new: true,
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
