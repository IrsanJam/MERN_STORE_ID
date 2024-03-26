import express from "express";
import { storeModel } from "../model/storeModel.mjs";
import { verifyToken } from "../middleware/middleware.mjs";

const router = express.Router();

router.get("/store", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await storeModel.findById(userId);
    if (!result) {
      return res.status(200).json({ message: "There is no store" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error get data" });
  }
});

router.post("/store", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const newStore = new storeModel({
      _id: userId,
      name: req.body.name,
      address: req.body.address,
    });
    const result = await newStore.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "You Cannot add more than 1 store" });
  }
});

router.delete("/store-all", async (req, res) => {
  try {
    const result = await storeModel.deleteMany({});
    if (result) {
      return res.status(200).json({ message: "Done, all deleted" });
    }
    return res.status(400).json({ message: "Nothing" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/store", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await storeModel.findByIdAndDelete(userId);
    if (result) {
      return res.status(200).json({ message: "Done, Store were deleted" });
    }
    return res.status(400).json({ message: "Nothing" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/store", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.body) {
      return res.status(400).json({ message: "Send all required fields" });
    }
    const result = await storeModel.findByIdAndUpdate(userId, req.body);
    if (!result) {
      return res.status(400).json({ message: "Error data" });
    }
    return res.status(200).json({ message: "Data succesfully updated" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;
