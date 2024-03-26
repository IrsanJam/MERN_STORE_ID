import mongoose from "mongoose";

const boxSchema = new mongoose.Schema({
  storage: { type: String },
  ram: { type: String },
  price: { type: Number },
  description: { type: String },
  name: { type: String },
  image: { type: String },
  brand: { type: String },
  processor: { type: String },
  categories: { type: String },
  stock: { type: Number },
  totalPrice: { type: Number },
  quantity: { type: Number },
  cartId: { type: String },
  storeId: { type: String },
  id: { type: String },
  productId: { type: String },
});

const boxResultSchema = new mongoose.Schema({
  items: [boxSchema],
  orderId: { type: String },
});

export const boxModel = mongoose.model("box", boxResultSchema);
