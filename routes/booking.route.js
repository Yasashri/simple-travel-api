import express from "express";

import {
  insertBookingData,
  updateBooking,
  getBookings,
  deleteBooking,
  getSingleBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getSingleBooking);
router.post("/", insertBookingData);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
