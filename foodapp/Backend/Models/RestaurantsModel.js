import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  cuisines: [String], 
  averagerating: {
    type: Number,
    default: 0,
  }, 
  services:{
    type: String,
    required: true,
  },
  contact:{
    type: String,
    required: true,
  },
  paymentmethod:{
    type: String,
    required: true,
  },
  thumbnail:{
    type: String,
    required: true,
  },
  images:{
    type: String,
    required: true,
  }
});

export default mongoose.model("Restaurant", restaurantSchema);
