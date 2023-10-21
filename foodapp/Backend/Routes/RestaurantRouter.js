import express from "express"
import { Addrestaurant, Allrestaurants, Singlerestaurant, Updaterestaurant, Deleterestaurant } from "../Controllers/RestaurantController"
const router= express.Router()

router.post("/addrestaurant", Addrestaurant)
router.get("/allrestaurants", Allrestaurants)
router.get("/singlerestaurant/:restaurant_id", Singlerestaurant)
router.put("/updaterestuarant/:restaurant_id", Updaterestaurant)
router.delete("/deleterestaurant/:restaurant_id", Deleterestaurant)

export default router