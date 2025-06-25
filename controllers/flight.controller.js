import { Flight } from "../models/index.js";

const insertFlightData = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFlights = async (req, res) => {
  try {
    const flight = await Flight.find({});
    res.status(200).json(flight);
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
    } else {
      res.status(200).json(flight);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await Flight.findByIdAndUpdate(id, req.body);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    } else {
      const updatedFlight = await Flight.findById(id);
      res.status(200).json(updatedFlight);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const checkFlight = await Flight.findById(id);
    if (!checkFlight) {
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
