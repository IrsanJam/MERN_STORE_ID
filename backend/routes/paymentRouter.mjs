import express from "express";
import paymentModel from "../model/paymentModel.mjs";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { verifyToken } from "../middleware/middleware.mjs";
import { boxModel } from "../model/boxModel.mjs";
import { productModel } from "../model/productModel.mjs";

const router = express.Router();

router.post("/payment", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { nama_lengkap, alamat } = req.body;
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-jZXMTb1aNThX2-exizCpQ2rc",
      clientKey: "SB-Mid-client-2zwerIPtHdJiORBs",
    });

    const lastOrder = await boxModel.findOne({});

    if (!lastOrder) {
      return res.status(400).json({ message: "Tidak ada pesanan sebelumnya" });
    }
    const { items } = lastOrder;
    const grossAmount = items.reduce((total, item) => total + item.totalPrice, 0);
    const order_id = uuidv4();
    let resultData = [];

    let parameter = {
      transaction_details: {
        order_id,
        gross_amount: grossAmount,
      },
      item_details: items,
      customer_details: {
        first_name: nama_lengkap,
        address: alamat,
      },
      callbacks: {
        finish: "https://mern-storeid.vercel.app",
      },
    };
    snap
      .createTransaction(parameter)
      .then(async (transaction) => {
        for (let item of items) {
          const itemAll = {
            brand: item.brand,
            type: item.type,
            quantity: item.quantity,
            image: item.image,
            storeId: item.storeId,
            productId: item.productId,
            transactionId: transaction.transactionId,
            status: "Diproses",
            transaction_id: order_id,
            nama_lengkap,
            alamat,
            price: item.price * item.quantity,
            orderId: userId,
            transaction_status: "Belum dibayar",
            stockDecremented: false,
          };
          resultData.push(itemAll);
        }
        const newTransaction = await paymentModel.create({ dataSemua: resultData, orderId: userId });
        const savedTransaction = await paymentModel.create(newTransaction);
        await boxModel.deleteMany({ orderId: req.user.id });
        res.status(200).json(transaction);
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        return res.status(500).send("Gagal memproses pembayaran: " + error.message);
      });
  } catch (error) {
    console.error("Error processing payment request:", error);
    return res.status(500).json({ message: "Error processing payment request", error });
  }
});

router.get("/my-payment", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const lastOrder = await paymentModel.find({ orderId: userId });
    res.status(200).json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.put("/payment/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await paymentModel.find({ "dataSemua._id": id });
    if (!order) {
      return res.status(404).json({ error: "Data tidak ditemukan." });
    }
    const updatedOrder = await paymentModel.findOneAndUpdate({ "dataSemua._id": id }, { $set: { "dataSemua.$.status": req.body.status } }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengubah status." });
  }
});

router.get("/payment", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const lastOrder = await paymentModel.find({ "dataSemua.storeId": userId });
    res.status(200).json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/payment-all", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const lastOrder = await paymentModel.find({});
      res.status(200).json(lastOrder);
    } else {
      const lastOrder = await paymentModel.find({ "dataSemua.nama_lengkap": name });
      res.status(200).json(lastOrder);
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/payment", verifyToken, async (req, res) => {
  try {
    const result = await paymentModel.deleteMany({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/payment-notifications", async (req, res) => {
  await paymentModel.updateMany(
    {},
    { $set: { "dataSemua.$[elem].transaction_status": req.body.transaction_status } },
    {
      arrayFilters: [
        {
          "elem.transaction_id": req.body.order_id,
        },
      ],
    }
  );

  const payments = await paymentModel.find({ "dataSemua.transaction_id": req.body.order_id, "dataSemua.transaction_status": "settlement" });
  for (let payment of payments) {
    for (let item of payment.dataSemua) {
      const productId = item.productId;
      const quantity = item.quantity;
      const product = await productModel.findById(productId);

      if (!product) {
        console.log("Produk tidak ditemukan");
        continue;
      }

      if (!item.stockDecremented && product.stock >= quantity) {
        product.stock -= quantity;
        item.stockDecremented = true;
        await product.save();
        console.log(`Stok produk diperbarui: ${product.stock}`);
      } else {
        console.log(`Stok produk  tidak diperbarui`);
      }
    }
  }

  res.status(200).send();
});

router.post("/payment-redirects", (req, res) => {
  res.status(200).send();
});

export default router;
