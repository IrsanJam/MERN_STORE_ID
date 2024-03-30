import express from "express";
import { verifyToken } from "../middleware/middleware.mjs";
import { cartModel } from "../model/cartModel.mjs";
import { ordersModel } from "../model/orderModels.mjs";
import { boxModel } from "../model/boxModel.mjs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/orders", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    await boxModel.deleteMany({});
    const findCart = await cartModel.find({ cartId: userId });
    const orderItems = [];

    for (const item of findCart) {
      const orderItem = {
        storage: item.storage,
        ram: item.ram,
        price: item.price,
        description: item.description,
        name: item.type,
        image: item.image,
        brand: item.brand,
        processor: item.processor,
        categories: item.categories,
        stock: item.stock,
        totalPrice: item.totalPrice,
        quantity: item.quantity,
        cartId: item.cartId,
        storeId: item.storeId,
        productId: item.productId,
        id: uuidv4(),
      };
      orderItems.push(orderItem);
    }
    const result = await ordersModel.create({ items: orderItems, orderId: userId });
    await boxModel.create({ items: orderItems, orderId: userId });
    await cartModel.deleteMany({ cartId: userId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "You Can't order" });
  }
});

router.get("/orders", verifyToken, async (req, res) => {
  try {
    const result = await ordersModel.find({ orderId: req.user.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "You Can't order" });
  }
});

router.delete("/orders", verifyToken, async (req, res) => {
  try {
    const result = await ordersModel.deleteMany({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "You Can't order" });
  }
});

export default router;
