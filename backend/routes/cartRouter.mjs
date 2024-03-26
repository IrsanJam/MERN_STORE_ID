import express from "express";
import { verifyToken } from "../middleware/middleware.mjs";
import { cartModel } from "../model/cartModel.mjs";
import { productModel } from "../model/productModel.mjs";

const router = express.Router();

router.post("/cart", verifyToken, async (req, res) => {
  const { productId } = req.query;
  const userId = req.user.id;

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let cartItem = await cartModel.findOne({ productId: productId, cartId: userId });
    if (cartItem) {
      cartItem.quantity += req.body.quantity;
      cartItem.totalPrice = cartItem.quantity * product.price;
      await cartItem.save();
    } else {
      cartItem = await cartModel.create({
        storage: product.storage,
        ram: product.ram,
        price: req.body.price,
        description: product.description,
        type: product.type,
        image: product.image,
        brand: product.brand,
        processor: product.processor,
        categories: product.categories,
        stock: product.stock,
        storeId: product.storeId,
        cartId: userId,
        quantity: req.body.quantity,
        totalPrice: req.body.quantity * product.price,
        productId: productId,
      });
    }
    return res.status(200).json(cartItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/cart", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await cartModel.find({ cartId: userId });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/cart/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await cartModel.findById(id);
    const resultPrice = parseInt(product.price);

    if (req.body.quantity > product.stock) {
      return res.status(400).json({ message: `Produk Hanya Tersisa ${product.stock}` });
    } else {
      const result = await cartModel.findByIdAndUpdate(id, { ...req.body, totalPrice: req.body.quantity * resultPrice });
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/cart/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cartModel.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/cart-all", async (req, res) => {
  try {
    const result = await cartModel.deleteMany({});
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
