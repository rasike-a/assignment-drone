import { validationResult } from "express-validator";
import mongoose from "mongoose";

import Dispatch from "../models/dispatch.js";
import Drone from "../models/drone.js";
import Medication from "../models/medication.js";

//Get available drones
const getAvailableDrones = async (req, res, next) => {
  try {
    const drones = await Drone.find({ state: "IDLE" }).exec();

    if (!drones) {
      const error = new Error("Drones list is empty.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Drones found.", content: drones });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Add medications to a given drone
const loadDrone = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const { orderItemIds, deliveryLocation } = req.body;

  const droneId = req.params.id;
  const drone = await Drone.findById(droneId);

  if (drone.batteryCapacity < 25) {
    res.status(400).json({
      message: "Drone battery level not enough for delivery",
      content: "",
    });
  }

  let items = orderItemIds.map((id) =>
    mongoose.mongo.BSON.ObjectId.createFromHexString(id)
  );

  const orderItems = await Medication.find({ _id: { $in: items } });
  const medicationWeightSum = orderItems.reduce((s, c) => s + c.weight, 0);

  console.log(medicationWeightSum);

  if (medicationWeightSum > drone.weightLimit) {
    res.status(400).json({
      message: "Medication load should be less than the maximum drone capacity",
      content: result,
    });
  }

  const dispatch = new Dispatch({
    orderItems,
    deliveryLocation,
    droneId,
    creator: { name: "Rasike" },
  });

  try {
    const result = await dispatch.save();
    console.log("Medication loaded");
    console.log(result);
    res.status(201).json({
      message: "Medication loaded successfully",
      content: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Get loaded medications data for a given drone
const getLoadedItems = async (req, res, next) => {
  const droneId = req.params.id;

  try {
    const medicationsList = await Dispatch.find({
      droneId: droneId,
      isDelivered: false,
    }).exec();

    console.log(medicationsList);

    if (!medicationsList) {
      const error = new Error("Drone don't have any medications.");
      error.statusCode = 404;
      throw error;
    }

    const results = {
      droneId,
      orderItems: medicationsList[0].orderItems,
    };

    res
      .status(200)
      .json({ message: "Medications list found.", content: results });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export { getAvailableDrones, getLoadedItems, loadDrone };
