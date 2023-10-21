import { Allusers, Adduser, Getuser, Updateuser, Deleteuser,Signin, Signup} from "../Controllers/UserController";
import express from "express";
const router = express.Router();

router.post("/adduser", Adduser)
router.get("/getuser/:user_id", Getuser)
router.get("/allusers", Allusers)
router.put("/updateuser/:user_id", Updateuser)
router.delete("/deleteuser/:user_id", Deleteuser)
router.post("/signup", Signup)
router.get("/signin", Signin)

export default router
