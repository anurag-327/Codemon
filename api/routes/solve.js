const express=require("express")
const router=express.Router();
const {verifyToken}=require("../controller/verifyToken");

//api to submit question
router.post("/test",verifyToken,require("../controller/solveController").testCode)
router.post("/submit",verifyToken,require("../controller/solveController").submitCode)
module.exports=router;