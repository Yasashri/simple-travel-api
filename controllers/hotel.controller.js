import { Hotel } from "../models/index.js";

const insertHotelData = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHotels = async (req, res) => {
  try {
    const hotel = await Hotel.find({});
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if(!hotel){
      return res.status(404).json({message: "Hotel not found"});
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndUpdate(id, req.body);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    } else {
      const updatedHotel = await Hotel.findById(id);
      res.status(200).json(updatedHotel);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const checkHotel = await Hotel.findById(id);
    if (!checkHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: "Hotel information deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { insertHotelData, getSingleHotel, updateHotel, deleteHotel, getHotels };
