const express=require("express")
const router=express.Router();
const {check,validationResult}=require("express-validator")
const authController=require("../controller/authController")

//login
router.post("/login",authController.login)

//signup
router.post("/signup",[
    check('email', 'Email cannot be empty').isEmail(),
    check('username', 'Name cannot be empty'),
    check('name', 'Name cannot be empty'),
    check('password', 'Password length should be 5 to 8 characters').isLength({ min: 5, max: 20 })
],authController.signup)


module.exports=router;