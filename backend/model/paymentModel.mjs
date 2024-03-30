import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  nama_lengkap: {
    type: String,
  },
  alamat: {
    type: String,
  },
  brand: { type: String },
  type: { type: String },
  quantity: { type: String },
  image: { type: String },
  price: {
    type: Number,
    required: true,
  },
  storeId: {
    type: String,
  },
  status: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
  transaction_status: {
    type: String,
  },
  productId: { type: String },
  stockDecremented: { type: Boolean },
  datePayment: {
    type: Date,
  },
});

const paymentItemSchema = new mongoose.Schema({
  dataSemua: [transactionSchema],
  orderId: {
    type: String,
  },
});

const paymentModel = mongoose.model("payment", paymentItemSchema);

export default paymentModel;
