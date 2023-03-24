import mongoose from "mongoose";
const Schema = mongoose.Schema;

const medicationSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: function (v) {
          return /([A-Za-z0-9\-\_]+)/.test(v);
        },
        message: "{VALUE} is not a valid name!",
      },
      required: [true, "Name required"],
    },
    weight: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      validate: {
        validator: function (v) {
          return /([A-Z0-9\_]+)/.test(v);
        },
        message: "{VALUE} is not a valid code!",
      },
      required: [true, "Code required"],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    creator: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Medication", medicationSchema);
