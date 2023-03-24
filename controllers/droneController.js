import Drone from "../models/drone.js";
import { validationResult } from "express-validator";

const getDrones = async (req, res, next) => {
  try {
    const drones = await Drone.find();

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

const addDrone = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  let { serialNumber, weightLimit, model, batteryCapacity, state } = req.body;

  const drone = new Drone({
    serialNumber,
    weightLimit,
    model,
    batteryCapacity,
    state,
    creator: { name: "Rasike" },
  });

  try {
    const result = await drone.save();
    console.log("Drone created");
    res.status(201).json({
      message: "Drone created successfully",
      content: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getDroneById = async (req, res, next) => {
  const droneId = req.params.id;

  try {
    const drone = await Drone.findById(droneId);

    if (!drone) {
      const error = new Error("Could not find the drone.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Drone found.", content: drone });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getDroneBatteryLevel = async (req, res, next) => {
  const droneId = req.params.id;

  try {
    const drone = await Drone.findById(droneId);

    if (!drone) {
      const error = new Error("Could not find the drone.");
      error.statusCode = 404;
      throw error;
    }

    const result = {
      droneId,
      batteryLevel: drone.batteryCapacity,
    };

    res.status(200).json({ message: "Drone found.", content: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateDroneState = async (req, res, next) => {
  const droneId = req.params.id;

  const state = req.body.state;

  try {
    const drone = await Drone.findById(droneId);

    if (!drone) {
      const error = new Error("Could not find the drone.");
      error.statusCode = 404;
      throw error;
    }

    drone.state = state;
    const result = await drone.save();

    res.status(200).json({ message: "Drone state updated.", content: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export {
  getDroneById,
  addDrone,
  getDrones,
  getDroneBatteryLevel,
  updateDroneState,
};

//mongodb+srv://rasike123:<password>@rasike-pvt.jhsph.mongodb.net/test
