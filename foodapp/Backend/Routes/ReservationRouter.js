import express from "express"
import { Addreservation, Allreservations, Singlereservation, Updatereservation,Deletereservation } from "../Controllers/ReservationController"
const router = express.Router()
router.post("/addreservation", Addreservation)
router.get("/allreservation", Allreservations)
router.get("/singlereservation/:reservation_id", Singlereservation)
router.put("/updatereservation/:reservation_id", Updatereservation)
router.delete("/deletereservation/:reservation_id", Deletereservation)


export default router