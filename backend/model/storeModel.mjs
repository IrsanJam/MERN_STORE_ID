import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      min: 10,
      required: true,
    },
  },
  { timestamps: true }
);

export const storeModel = mongoose.model("store", storeSchema);
