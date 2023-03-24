import express from "express";
const router = express.Router();

import {
  getMedicationById,
  addMedication,
  getMedications,
} from "../controllers/medicationController.js";

router.route("/").post(addMedication);
router.route("/").get(getMedications);
router.route("/:id").get(getMedicationById);

export default router;
