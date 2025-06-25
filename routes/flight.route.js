import express from "express";
import {
  getFlights,
  getSingleFlight,
  updateFlight,
  deleteFlight,
  insertFlightData,
} from "../controllers/flight.controller.js";

const router = express.Router();

router.get("/", getFlights);
router.get("/:id", getSingleFlight);
router.post("/", insertFlightData);
router.put("/:id", updateFlight);
router.delete("/:id", deleteFlight);

export default router;
