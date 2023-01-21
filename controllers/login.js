const codes=require("../model/code");
const users=require("../model/users");
const path=require("path");
const fs=require('fs');
const cors = require('cors');
const questions=require("../model/question")
const { stdout } = require("process");
const { json } = require("body-parser");
const exec = require('child_process').exec;

module.exports.login= async (req,res) =>
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
}

module.exports.signup=async (req,res) =>
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

}