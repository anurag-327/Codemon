const codes=require("../model/code");
const questions=require("../model/question");
const path=require("path");
// const fs=require('fs');
// const cors = require('cors');
// const { stdout } = require("process");
// const { json } = require("body-parser");
// const exec = require('child_process').exec;

module.exports.addtestcase= async function(req,res)
{ 
     // console.log(req.body);
     const question=await questions.findOne({_id:req.body.id});
     let array=question.testcases;
     // console.log(array);
     array.push({input:req.body.input,output:req.body.output});
     const data=await questions.findByIdAndUpdate(req.body.id,{testcases:array});

} 