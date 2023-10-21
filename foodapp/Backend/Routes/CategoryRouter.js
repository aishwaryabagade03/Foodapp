import express from "express"
import { Addcategory, AllCategories, GetCategory, UpdateCategory, DeleteCategory } from "../Controllers/CategoryController"
const router = express.Router()
router.post("/addcategory", Addcategory)
router.get("/allcategory", AllCategories)
router.get("/singlecategory/:category_id",GetCategory)
router.put("/updatecategory/:category_id", UpdateCategory)
router.delete("/deletecategory/:category_id", DeleteCategory)


export default router