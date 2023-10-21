import express from "express"
import { AddOrder, Getorderitems, Deleteorder } from "../Controllers/OrderController"
const router = express.Router()
router.post("/addorder", AddOrder)
router.get("/allorder/:order_id", Getorderitems)
router.delete("/deleteorder/:order_id", Deleteorder)


export default router