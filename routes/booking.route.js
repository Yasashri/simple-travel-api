import express from "express";

import {
  insertBookingData,
  getBookings,
  deleteBooking,
  getSingleBooking,
  getUserBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();
router.get("/user", getUserBookings);
router.get("/", getBookings);
router.post("/", insertBookingData);
router.delete("/:id", deleteBooking);

export default router;
