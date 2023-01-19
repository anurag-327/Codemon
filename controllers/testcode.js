const codes=require("../model/code");
const path=require("path");
const fs=require('fs');
const cors = require('cors');
const { stdout } = require("process");
const { json } = require("body-parser");
const exec = require('child_process').exec;

module.exports.testcode=function(req,res)
{
    fs.writeFileSync(path.join(__dirname,"../input_code.cpp"), req.body.code);
    fs.writeFileSync(path.join(__dirname,"../input.txt"), req.body.input);
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
                // console.log(" 1 error",error.message);
                // console.log("appfile promise rejected");
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
                //   console.log(" 2 error",error.message);
                //   console.log(" 2 stderr",stderr);
                  reject("cannot make app run");
              }
              else
              {
                // console.log("output: ",stdout);
                // console.log("promise resolved");
                resolve("app resolved")
                // res.status(200)
                console.log("code ran and gave an output");
                return(res.json({"output":stdout}));
              }
              
          });
    })

}

    appfile().then(runfile)
    .catch(function ()
    {
        console.log("could not execute  app file")
        return(res.json({error:"could not execute"}))
    })          
}


