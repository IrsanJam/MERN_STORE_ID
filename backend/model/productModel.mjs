import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  storage: { type: String },
  ram: { type: String },
  price: { type: Number },
  description: { type: String },
  type: { type: String },
  image: { type: String },
  brand: { type: String },
  processor: { type: String },
  categories: { type: String },
  stock: { type: Number },
  storeId: { type: String },
});

export const productModel = mongoose.model("product", productSchema);
