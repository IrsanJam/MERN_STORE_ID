import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
  totalPrice: { type: Number },
  quantity: { type: Number },
  cartId: { type: String },
  storeId: { type: String },
  productId: { type: String },
});

export const cartModel = mongoose.model("cart", cartSchema);
