import Drone from "../models/drone.js";
import logger from "./default.logger.js";

const executeBatteryStatusLogger = async () => {
  try {
    const drones = await Drone.find();

    if (!drones) {
      const error = new Error("Drones list is empty.");
      error.statusCode = 404;
      throw error;
    }

    for (let drone of drones) {
      logger.info(
        `Drone : ${drone.serialNumber} - battery level : ${drone.batteryCapacity} - model : ${drone.model} - state : ${drone.state}`
      );
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      logger.error(err);
    }
  }
};

export { executeBatteryStatusLogger };
