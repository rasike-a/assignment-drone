import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Medication from "../models/medication.js";
import { validationResult } from "express-validator";

const getMedications = async (req, res, next) => {
  try {
    const medications = await Medication.find();

    if (!medications) {
      const error = new Error("Medication list is empty.");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ message: "Medications found.", content: medications });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addMedication = async (req, res, next) => {
  let uploadPath;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  if (!req.files) {
    res.send({
      status: false,
      message: "No file uploaded",
    });
  } else {
    let photo = req.files.photo;
    let { name, weight, code } = req.body;

    console.log(name);
    console.log(weight);
    console.log(code);

    const __filename = fileURLToPath(import.meta.url);

    uploadPath = path.dirname(__filename);
    uploadPath = path.resolve(uploadPath, "..");

    if (name && code) {
      uploadPath = `${uploadPath}\\uploads\\${code}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      uploadPath = `${uploadPath}\\${photo.name}`;
      console.log(uploadPath);
    } else {
      console.log("Name and code not found");
    }

    console.log(uploadPath);

    const result = await photo.mv(uploadPath);
    console.log("file saved");

    const medication = new Medication({
      name,
      weight,
      code,
      imageUrl: uploadPath,
      creator: { name: "Rasike" },
    });

    try {
      const result = await medication.save();
      console.log("Medication created");
      res.status(201).json({
        message: "Medication created successfully",
        content: result,
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
};

const getMedicationById = async (req, res, next) => {
  const medicationId = req.params.id;

  try {
    const medication = await Medication.findById(medicationId);

    if (!medication) {
      const error = new Error("Could not find the medication.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Medication found.", content: medication });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export { getMedicationById, addMedication, getMedications };
