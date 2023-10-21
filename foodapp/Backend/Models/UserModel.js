import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  contact: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Invalid phone number format',
    }},
  location:{
    type:String,
    required:true,
  },
  otp:{
    type:Number,
    default:null,
  },
  createdAt:{
    type:Date,
    default: Date.now(),
  }
})

export default mongoose.model("User", UserSchema)