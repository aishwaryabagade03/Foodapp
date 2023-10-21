import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import Userrouter from "./Routes/UserRouter"
import Restaurantrouter from "./Routes/RestaurantRouter"
import Reservationrouter from "./Routes/ReservationRouter"
import Orderrouter from "./Routes/OrderRouter"
import Foodrouter from "./Routes/FoodRouter"
import Drinkrouter from "./Routes/DrinkRouter"
import Categoryrouter from "./Routes/CategoryRouter"
import Cartrouter  from "./Routes/CartRouter"
import Billrouter from "./Routes/BillRouter"


var app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors(corsOptions))
var corsOptions={
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Your server running on http://localhost:" + PORT);
});

// checkout
// app.post("/checkout",async(req,res)=>{
 
  
// })


mongoose
  .connect("mongodb://127.0.0.1:27017/" + process.env.dbname)
  .then(() => console.log("Connected!"));

app.use("/User", Userrouter)
app.use("/Category", Categoryrouter)
app.use("/Order", Orderrouter)
app.use("/Bill", Billrouter)
app.use("/Cart", Cartrouter)
app.use("/Drink", Drinkrouter)
app.use("/Food", Foodrouter)
app.use("/Restaurant", Restaurantrouter)
app.use("/Reservation", Reservationrouter)
