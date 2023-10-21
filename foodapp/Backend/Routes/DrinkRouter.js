import express from "express"
import { Adddrink, Alldrinks, Singledrink, Updatedrink, Deletedrink } from "../Controllers/DrinkController"
const router = express.Router()
router.post("/adddrink", Adddrink)
router.get("/alldrink", Alldrinks)
router.get("/singledrink/:drink_id", Singledrink)
router.put("/updatedrink/:drink_id", Updatedrink)
router.delete("/deletedrink/:drink_id", Deletedrink)


export default router