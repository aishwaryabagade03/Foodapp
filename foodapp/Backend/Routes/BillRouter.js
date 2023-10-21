import express from "express"
import { Addbilling, getbill, updatePaymentStatus,updatebill } from "../Controllers/BillingController"
const router = express.Router()
router.post("/addbill", Addbilling)
router.get("/singlebill", getbill)
router.put("/updatepaymentstatus/:bill_id", updatePaymentStatus)
router.put("/updatebill/:bill_id", updatebill)



export default router