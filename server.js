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
// const userdetails=require("./model/userdetails");
const testcode_controller=require("./controllers/solve");
const compilecode_controller=require("./controllers/compilecode");
const addques_controller=require("./controllers/addques");
const addtestcase_controller=require("./controllers/addtestcase");

app.get("/",async (req,res)=>
{
    const queslist=await questions.find();
    // console.log(queslist);
    // console.log(req.cookies.user_id)
    return res.render("index",{questions:queslist,user_id:req.cookies.user_id});
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
    // console.log(req.params);
    if(req.cookies.user_id)
    {
        const question =await questions.findOne({_id:req.params.id});
        return res.render("solve",{question:question});
    }
    else
    {
        res.redirect("/login");
    }
})
app.get("/addtestcase/:id",async (req,res)=>
{
    const question =await questions.findOne({_id:req.params.id});
    // console.log(question);
    return res.render("addtestcase",{question:question});
})
app.get("/login",(req,res) =>
{
    res.render("login");
})
app.get("/profile",async (req,res) =>
{
    
   
    const user=await users.findOne({_id:req.cookies.user_id}).populate({path:"questionssolved",populate:{path:"questionid"}});
    // console.log(result.questionssolved);
    // const user=await users.findOne({_id:req.cookies.user_id});
    res.render("account",{user_id:req.cookies.user_id,user:user});
})

app.post("/addtestcase",addtestcase_controller.addtestcase);
app.get("/addques",addques_controller.addques)
app.post('/addques',addques_controller.saveques)
app.post('/solve/run',testcode_controller.testcode)
app.post('/solve/submit',testcode_controller.submitcode)
app.post('/compile',compilecode_controller.compilecode)

app.post('/loginacc',async (req,res) =>
{
    // console.log(req.body);
    users.findOne({email:req.body.email,password:req.body.password},function(err,user)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(user);
            if(user)
            {
                res.cookie('user_id',user._id);
                // console.log("userid")
                // console.log(req.cookies.user_id)
                res.redirect('/');
            }
            else
            {
                console.log("error")
                // res.render('error',{message:"Wrong credentials"});
                res.redirect("/error");
            }
        }
    })
})
app.post('/signupacc',function(req,res)
{
    // console.log(req.body);
    if(req.body.password != req.body.confirmpassword)
    {
        console.log(req.body.password,req.body.confirmpassword);
        console.log("fail");
        res.redirect("/error");
        // return res.render('error',{message:"Wrong password"});
    }
    else
    {
        users.findOne({email:req.body.email},async function(err,user)
        {
            if(err)
            console.log("hi",err.message);
            if(!user)
            {
                const email=req.body.email;
                const username=email.slice(0,email.indexOf('@'));
                
                const createDocument = async () =>
                {
                  try{
                        const newUser=new users({name:req.body.name,
                        username:username
                        ,email:req.body.email,
                        password:req.body.password})
                        const result= await newUser.save();
                        // console.log(result);
                      }catch(err)
                     {
                         console.log(err.message);
                     }
                }
                createDocument();
                return res.redirect('/login');
            }
           else
            {
                console.log("fail");
                return res.rendirect('/error');
                // return res.render('error',{message:"Account already exixts"});

            }
        })
    }
    
})
app.get('/signout',function(req,res)
{
    res.clearCookie("user_id");
    return res.redirect("/");
})

app.use((req,res,next)=>{
    return res.json("Error pafe");
})
app.listen(port,() =>{
    console.log("Server connected at 5000");
})