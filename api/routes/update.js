const express=require("express")
const router=express.Router();
const User=require("../model/user")
const Question=require("../model/question")
const Code=require("../model/code");
const {verifyToken}=require("../controller/verifyToken");

router.post("/addQuestion",verifyToken,async(req,res)=>
{
    try {
        (async() =>{
        const newquestion= new Question(
            {
                question:req.body.question,
                description:req.body.description,
                sampleCases:req.body.testCase,   
                defaultCode:req.body.defaultCode,
                points:req.body.points,
                difficultyLevel:req.body.difficultyLevel,
                testCases:req.body.testCase   
            }
        )
        const result= await newquestion.save();
        if(result)
           return res.status(200).json({status:200,questions:result});
        else   
           return res.status(404).json({status:404,message:"Questions not found"});
    })()
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:500,message:"Server Error"}) 
    }
})
router.post("/addTestCase",verifyToken,async(req,res)=>
{
    try {
       const question=await Question.findOne({_id:req.body.id});
       let array=question.testCases;
       array.push({input:req.body.input,output:req.body.output});
       const data=await Question.findByIdAndUpdate(req.body.id,{testCases:array});
       return res.status(200).json({status:200,message:"success"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:500,message:"Server Error"}) 
    }
})


module.exports=router;