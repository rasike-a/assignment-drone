import express from "express";
const router = express.Router();

import {
  getAvailableDrones,
  loadDrone,
  getLoadedItems,
} from "../controllers/dispatchController.js";

router.route("/:id").post(loadDrone);
router.route("/").get(getAvailableDrones);
router.route("/:id").get(getLoadedItems);

export default router;
