import express from "express"
import { AddtoCart, Getcartitems, Updatequantity, Deletequantity, Removecartitem, checkout } from "../Controllers/CartController"
const router = express.Router()
router.post("/addtocart",AddtoCart)
router.get("/allcartitems/:user_id", Getcartitems)
router.delete("/removecartitem/:cart_id", Removecartitem)
router.put("/updatequantity/:cart_id", Updatequantity)
router.delete("/deletequantity/:cart_id", Deletequantity)
router.post('/checkout',checkout)

export default router