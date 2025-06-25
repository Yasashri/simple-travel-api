import express from "express";

import {
  insertHotelData,
  getSingleHotel,
  updateHotel,
  deleteHotel,
  getHotels,
} from "../controllers/hotel.controller.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/:id", getSingleHotel);
router.post("/", insertHotelData);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
