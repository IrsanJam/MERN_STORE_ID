import { urlPort } from "./config.mjs";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { mongoDBURL } from "./config.mjs";
import authModel from "./routes/authRouter.mjs";
import userModel from "./routes/userRouter.mjs";
import storeModel from "./routes/storeRouter.mjs";
import productModel from "./routes/productRouter.mjs";
import cartModel from "./routes/cartRouter.mjs";
import ordersModel from "./routes/ordersRouter.mjs";
import paymentModel from "./routes/paymentRouter.mjs";
import boxModel from "./routes/boxRouter.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/", [authModel, userModel, storeModel, productModel, cartModel, ordersModel, boxModel, paymentModel]);

app.get("/", (req, res) => {
  res.json({ message: "Hello, Welcome to MERN Project" });
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(urlPort, () => {
      console.log("Connected to Port 5555");
    });
  })
  .catch((error) => {
    console.log("Error Connection", error);
  });
