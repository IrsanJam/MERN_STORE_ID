import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
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

const orderResultSchema = new mongoose.Schema({
  items: [orderSchema],
  orderId: { type: String },
});

export const ordersModel = mongoose.model("orders", orderResultSchema);
