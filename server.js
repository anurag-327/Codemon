const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const wretch=require ("wretch");
const port=5000||process.env;
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(__dirname));

const mongoose=require("./controllers/mongoose");
const questions=require("./model/question")
const users=require("./model/users")
const codes=require("./model/code");

const testcode_controller=require("./controllers/solve");
const compilecode_controller=require("./controllers/compilecode");
const addques_controller=require("./controllers/addques");
const addtestcase_controller=require("./controllers/addtestcase");
const login_controller=require("./controllers/login");

app.get("/",async (req,res)=>
{
    const filter=req.query.filter;
    let queslist;
    if(filter=="all" || (!filter))
    {
        queslist=await questions.find();
    }
    else
    {
         queslist=await questions.find({difficultylevel:filter});
    }
    return res.render("index",{questions:queslist,user_id:req.cookies.user_id});
})
app.get("/login",(req,res) =>
{
    res.clearCookie("user_id");
    res.render("login");
})
app.get("/profile",async (req,res) =>
{
    const user=await users.findOne({_id:req.cookies.user_id}).populate({path:"questionssolved",populate:{path:"questionid"}});
    // console.log(user);
    res.render("account",{user_id:req.cookies.user_id,user:user});
})
app.get('/signout',function(req,res)
{
    res.clearCookie("user_id");
    return res.redirect("/");
})
app.get("/compiler",async (req,res)=>
{
    return res.render("compiler");
})
app.get("/testcase",async (req,res)=>
{
    const question =await questions.find();
    return res.render("testcase",{questions:question});
})
app.get("/solve/:id",async (req,res) =>
{
    if(req.cookies.user_id)
    {
        const question =await questions.findOne({_id:req.params.id});
        const code=await codes.findOne({userid:req.cookies.user_id,questionid:req.params.id}).populate({path:"questionid"});
        if(code)
        {
            // console.log(code.code)
            return res.render("solve",{question:question,usercode:code.code});
        }
        else
        {
            return res.render("solve",{question:question,usercode:""});
        }
    }
    else
    {
        res.redirect("/login");
    }
})
app.get("/addtestcase/:id",async (req,res)=>
{
    const question =await questions.findOne({_id:req.params.id});
    return res.render("addtestcase",{question:question});
})



app.post("/addtestcase",addtestcase_controller.addtestcase);
app.get("/addques",addques_controller.addques)
app.post('/addques',addques_controller.saveques)
app.post('/solve/run',testcode_controller.testcode)
app.post('/solve/submit',testcode_controller.submitcode)
app.post('/compile',compilecode_controller.compilecode)
app.post('/loginacc',login_controller.login)
app.post('/loginacc',login_controller.signup)
app.post("/update",async function(req,res)
{
      const data= await users.findByIdAndUpdate(req.cookies.user_id,{personaldetails:{gender:req.body.gender,summary:req.body.summary,location:req.body.location,skills:req.body.skills},socialmedia:{github:req.body.github,linkedin:req.body.linkedin,twitter:req.body.twitter}}); 
      return(res.redirect("/profile"))
})

app.use((req,res,next)=>{
    return res.json("Error page");
})
app.listen(port,() =>{
    console.log("Server connected at 5000");
})