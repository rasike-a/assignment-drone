import mongoose from "mongoose";

const dispatchSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    orderItems: [
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
          type: String,
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
      },
    ],
    deliveryLocation: {
      long: { type: String, required: true },
      lat: { type: String, required: true },
    },
    droneId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Drone",
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Dispatch", dispatchSchema);
