import mongoose from "mongoose";
const Schema = mongoose.Schema;

const droneSchema = new Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },
    weightLimit: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      enum: ["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
    },
    batteryCapacity: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: [
        "IDLE",
        "LOADING",
        "LOADED",
        "DELIVERING",
        "DELIVERED",
        "RETURNING",
      ],
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Drone", droneSchema);
