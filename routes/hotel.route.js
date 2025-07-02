import express from "express";
import multer from "multer";
import path from "path";

import {
  insertHotelData,
  getSingleHotel,
  updateHotel,
  deleteHotel,
  getHotels,
} from "../controllers/hotel.controller.js";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", getHotels);
router.get("/:id", getSingleHotel);

// Add multer middleware here for image upload
router.post("/", upload.single("hotelImage"), insertHotelData);
router.put("/:id", upload.single("hotelImage"), updateHotel);

router.delete("/:id", deleteHotel);

export default router;
