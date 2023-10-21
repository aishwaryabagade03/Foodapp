import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  alcohol: {
      type: String,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  thumbnail:{
    type: String,
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now(),
  },
})

export default mongoose.model("Drink", DrinkSchema);
