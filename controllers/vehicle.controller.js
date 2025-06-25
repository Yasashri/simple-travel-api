import { Vehicle } from "../models/index.js";

const insertVehicleData = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByIdAndUpdate(id, req.body);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    } else {
      const updatedVehicle = await Vehicle.findById(id);
      res.status(200).json(updatedVehicle);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const checkVehicle = await Vehicle.findById(id);
    if (!checkVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    await Vehicle.findByIdAndDelete(id);
    res.status(200).json({ message: "Vehicle information deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  insertVehicleData,
  getSingleVehicle,
  updateVehicle,
  getVehicles,
  deleteVehicle,
};
