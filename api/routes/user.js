const express=require("express")
const router=express.Router();
const {verifyToken}=require("../controller/verifyToken");

// user profile
router.get("/:id",require("../controller/userController").getUser)
// mini data of user
router.get("/getMinidata",verifyToken,require("../controller/userController").getMinidata)


module.exports=router;