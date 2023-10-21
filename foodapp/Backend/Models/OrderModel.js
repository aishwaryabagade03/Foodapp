import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  paymentmethod:{
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  orderdate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Order", OrderSchema);