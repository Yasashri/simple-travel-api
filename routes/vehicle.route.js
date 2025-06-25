import express from "express";

import {
  insertVehicleData,
  getSingleVehicle,
  updateVehicle,
  getVehicles,
  deleteVehicle,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", getVehicles);
router.get("/:id", getSingleVehicle);
router.post("/", insertVehicleData);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
