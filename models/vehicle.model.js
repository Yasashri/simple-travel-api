import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    vehicleNo: {
      type: String,
      required: [true, "Please enter vehicle number"],
    },
    vehicleDriver: {
      type: String,
      required: [true, "Please enter driver name"],
    },
    vehicleContact: {
      type: Number,
      required: [true, "Please enter contact number"],
    },
    vehicleImage: {
      type: String,
      required: false,
    },
    vehicleModel: {
      type: String,
      required: false,
    },
    vehicleBasePrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
