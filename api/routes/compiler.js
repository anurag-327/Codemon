const express=require("express")
const router=express.Router();

//api to compile codes
router.post("/compile",require("../controller/compilationController").compile)
module.exports=router;