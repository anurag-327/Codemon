const codes=require("../model/code");
const users=require("../model/users");
const path=require("path");
const fs=require('fs');
const cors = require('cors');
const questions=require("../model/question")
const { stdout } = require("process");
const { json } = require("body-parser");
const exec = require('child_process').exec;

module.exports.testcode=function(req,res)
{
    // console.log(req.body);
    fs.writeFileSync(path.join(__dirname,"../input_code.cpp"), req.body.code);
    fs.writeFileSync(path.join(__dirname,"../input.txt"), req.body.input);
    fs.writeFileSync(path.join(__dirname,"../expectedoutput.txt"), req.body.expectedoutput);
    // const savecode=async () =>
    // {
    //     console
    //     try{
    //         const newcode=new codes({
    //             code:req.body.code
    //         })
    //         const resultcode=await newcode.save();
    //         // console.log(resultcode);
    //     }
    //     catch(err)
    //     {
    //         console.log(err.message);
    //     }
    // }
    // savecode();

    
function appfile()
{
    return new Promise(function(resolve,reject)
    {
        const proc = exec("g++ input_code.cpp -o output.exe",(error,stdout,stderr)=>
        {
            if(error || stderr)
            {
                reject("request rejected");
                // res.status(605);
                console.log("code gave error");
                return(res.json({error:error.message}))
            }
            else
            {
                // console.log("appfile promise resolved");
                resolve("Accepted promise"); 
            }

        });
    })
}

function runfile()
{
    return new Promise(function(resolve,reject)
    {
        const proc1 = exec("output.exe",(error,stdout,stderr)=>
          {
              if(error || stderr)
              {
                  reject("cannot make app run");
                  return(res.json({error:"Failed to execute \nTry re checking your input field"}))
              }
              else
              {
                resolve("app resolved")
                // console.log("code ran and gave an output");
                // return(res.json({"output":stdout}));
                fs.readFile('output.txt', 'utf8', function(err, data)
                {  
                    fs.readFile('expectedoutput.txt','utf8', function(err,data2)
                    {
                        if(data==data2)
                        return(res.json({output:data,expected:data2,result:true}));
                        else
                        return(res.json({output:data,expected:data2,result:false}));

                    })
                });
                
              }
              
          });
    })

}

    appfile().then(runfile)
    .catch(function ()
    {
        console.log("could not execute  app file")
        // return(res.json({error:"could not execute"}))
    })          
}

module.exports.submitcode= async function(req,res)
{
    const code=req.body.code;
    const question=await questions.findOne({_id:req.body.id});
    const testcases=await question.testCases;
    for(let i of testcases )
    {
        const input=i.input;
        const output=i.output;
        let options={
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({code:code,input:input,expectedoutput:output})
        }
        let p= await fetch("http://localhost:5000/solve/run",options);
        let response= await p.json();
        if(response.error)
        {
            return(res.json({error:response.error}))
        }
        else
        {
            if(!response.result)
            {
                 return(res.json({input:input,expectedoutput:output,output:response.output,result:false}));
            }
        }
    }
        const userdetails=await users.findOne({_id:req.cookies.user_id});
        const array=await userdetails.questionsSolved;
        let flag=true;
        for(let i of array)
        { 
            if(i)
            {
                if(i.questionid.equals(question._id))
                {
                   flag=false;
                   break;
                }
            }
        }
        if(flag==true)
        {
            const savecode=async () =>
            {
                try{
                     const newcode=new codes({
                     code:req.body.code,
                     questionid:question._id,
                     userid:req.cookies.user_id,
                     })
                     const resultcode=await newcode.save();
                    }
                    catch(err)
                    {
                        console.log(err.message);
                    }
            }
                   savecode();
            // console.log("unattempted question")
            array.push({questionid:question._id});
            const data= await users.findByIdAndUpdate(req.cookies.user_id,{$inc:{'userpoints':50},questionsSolved:array});
            return(res.json({result:true,pointsobtained:50}));
        }
        else
        {
           const code= await codes.find({userid:req.cookies.user_id,questionid:question._id});
           const codeid= await codes.findByIdAndUpdate(codes._id,{code:req.body.code})
           return(res.json({result:true})); 
        }

        

}


