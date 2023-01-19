const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const port=5000||process.env;
app.use(express.json());

const wretch=require ("wretch");
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(__dirname));
const mongoose=require("./controllers/mongoose");
const question=require("./model/question")
const testcode_controller=require("./controllers/testcode");
const addques_controller=require("./controllers/addques");
app.get("/",async (req,res)=>
{
    const queslist=await question.find();
    return res.render("index",{question:queslist});
})
app.get("/compiler",async (req,res)=>
{
   return res.render("compiler");
})
app.get("/addques",addques_controller.addques)
app.post('/addques',addques_controller.saveques)

app.post('/test',testcode_controller.testcode)

app.use((req,res,next)=>{
    return res.json("Error pafe");
})
app.listen(port,() =>{
    console.log("Server connected at 5000");
})