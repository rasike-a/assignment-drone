import express from "express";
const router = express.Router();

import {
  getDrones,
  addDrone,
  getDroneById,
  getDroneBatteryLevel,
  updateDroneState,
} from "../controllers/droneController.js";

router.route("/").post(addDrone);
router.route("/").get(getDrones);
router.route("/:id").get(getDroneById);
router.route("/:id/battery").get(getDroneBatteryLevel);
router.route("/:id/state").put(updateDroneState);

export default router;
