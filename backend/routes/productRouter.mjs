import express from "express";
import { productModel } from "../model/productModel.mjs";
import { verifyToken } from "../middleware/middleware.mjs";
import { configureMulter } from "../multerConfig.mjs";
import { configureCloudinary } from "../cloudinaryConfig.mjs";
import { v2 as cloudinary } from "cloudinary";

configureCloudinary();
const upload = configureMulter();
const router = express.Router();

router.post("/product", verifyToken, upload.single("image"), async (req, res) => {
  const userId = req.user.id;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    let imageUrl;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });

        streamLoad.end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }
    const newProduct = {
      storage: req.body.storage,
      ram: req.body.ram,
      price: req.body.price,
      description: req.body.description,
      type: req.body.type,
      image: imageUrl,
      brand: req.body.brand,
      processor: req.body.processor,
      categories: req.body.categories,
      stock: req.body.stock,
      storeId: userId,
    };
    const savedProduct = await productModel.create(newProduct);
    return res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/product/:id", verifyToken, upload.single("image"), async (req, res) => {
  const { id } = req.params;
  try {
    let updateObject = { ...req.body };
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });

        streamLoad.end(req.file.buffer);
      });

      updateObject.image = result.secure_url;
    }
    const updatedProduct = await productModel.findByIdAndUpdate(id, updateObject, { new: true });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/product", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await productModel.find({ storeId: userId });
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/product/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await productModel.findById(id);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/product/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/product-all", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await productModel.find({ storeId: { $ne: userId }, stock: { $gt: 0 } });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/product-all", async (req, res) => {
  try {
    const result = await productModel.deleteMany({});
    return res.status(200).json({ message: "All Products been deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
