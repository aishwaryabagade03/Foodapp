import express from "express"
import { AddFood,AllFoods, Updatefood,Singlefood, Deletefood } from "../Controllers/FoodController"
const router = express.Router()
router.post("/addfood", AddFood)
router.get("/allfood", AllFoods)
router.get("/singlefood/:food_id", Singlefood)
router.put("/updatefood/:food_id", Updatefood)
router.delete("/deletefood/:food_id", Deletefood)


export default router