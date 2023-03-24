import { validationResult } from "express-validator";
//import { ObjectId } from "mongoose";
import mongoose from "mongoose";

import Dispatch from "../models/dispatch.js";
import Drone from "../models/drone.js";
import Medication from "../models/medication.js";

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

  // let ObjectId = mongoose.Types.ObjectId;

  let objId = mongoose.mongo.BSON.ObjectId.createFromHexString(
    "641c04c2d1120c8149fd6e0b"
  );

  console.log(objId);

  // const orderItemIdAsObjects = orderItems.map((id) => {
  //   let obj = new ObjectId(id.toString());
  //   console.log(id, obj);
  //   return obj;
  // });

  console.log(orderItemIds);
  let items = orderItemIds.map((id) =>
    mongoose.mongo.BSON.ObjectId.createFromHexString(id)
  );

  const orderItems = await Medication.find({ _id: { $in: items } });

  console.log(orderItems);

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

const getDroneBatteryLevel = function (req, res, next) {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error("Could not find the product.");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ message: "Product found.", content: product });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export { getAvailableDrones, getDroneBatteryLevel, getLoadedItems, loadDrone };

//mongodb+srv://rasike123:<password>@rasike-pvt.jhsph.mongodb.net/test
