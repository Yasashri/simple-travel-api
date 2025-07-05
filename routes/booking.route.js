import express from "express";

import {
  insertBookingData,
  getBookings,
  deleteBooking,
  getSingleBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getSingleBooking);
router.post("/", insertBookingData);
router.delete("/:id", deleteBooking);

export default router;
