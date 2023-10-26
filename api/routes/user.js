const express=require("express")
const router=express.Router();
const {verifyToken}=require("../controller/verifyToken");
const userController=require("../controller/userController")
// user profile
// mini data of user
router.get("/getMinidata",verifyToken,userController.getMinidata)
router.get("/:id",userController.getUser)


module.exports=router;