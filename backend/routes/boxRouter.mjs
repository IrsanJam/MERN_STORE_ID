import express from "express";
import { verifyToken } from "../middleware/middleware.mjs";
import { boxModel } from "../model/boxModel.mjs";

const router = express.Router();

router.get("/box", verifyToken, async (req, res) => {
  try {
    const result = await boxModel.find({ orderId: req.user.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Data Not Found" });
  }
});

export default router;
