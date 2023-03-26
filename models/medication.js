import mongoose from "mongoose";
const Schema = mongoose.Schema;

const medicationSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9_-]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid name!`,
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
          return /^[A-Z0-9_]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid code!`,
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
