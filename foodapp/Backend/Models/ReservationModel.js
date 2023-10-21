import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
 fname:{
  type: String, 
  required: true,
 },
 lname:{
  type: String, 
  required: true,
 },
 email:{
  type: String, 
  required: true,
 },
 contact:{
  type: String, 
  required: true,
 },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  partysize: {
    type: Number,
    required: true,
  },
  specialrequests: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending',
  },
});

export default mongoose.model('Reservation', reservationSchema);

