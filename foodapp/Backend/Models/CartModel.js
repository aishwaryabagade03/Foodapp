import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  foodid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Array,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Cart", CartSchema);