const codes=require("../model/code");
const path=require("path");
const fs=require('fs');
const cors = require('cors');
const { stdout } = require("process");
const exec = require('child_process').exec;
module.exports.testcode=function(req,res)
{
    // console.log(req.body);
    fs.writeFileSync(path.join(__dirname,"../input_code.cpp"), req.body.code);
    const savecode=async () =>
    {
        console
        try{
            const newcode=new codes({
                code:req.body.code
            })
            const resultcode=await newcode.save();
            // console.log(resultcode);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    // savecode();
    // runcode();
    // let result={"output":' ',"error":''};

    
function appfile()
{
    return new Promise(function(resolve,reject)
    {
        const proc = exec("g++ input_code.cpp -o output.exe",(error,stdout,stderr)=>
        {
            if(error || stderr)
            {
                console.log(" 1 error",error.message);
                console.log("appfile promise rejected");
                reject("request rejected");
            }
            else
            {
                console.log("appfile promise resolved");
                resolve("Accepted promise"); 
            }
          //   console.log("stdout in 1st fn",stdout);
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
                  console.log(" 2 error",error.message);
                  console.log(" 2 stderr",stderr);
                  reject("cannot make app run");
              }
              else
              {
                console.log("output: ",stdout);
                console.log("promise resolved");
                resolve("app resolved")
                return(res.json("app run sucessfully"));
              }
              
          });
    })

}

    appfile().then(runfile)
    .catch(function ()
    {
        console.log("could not execute  app file")
        return(res.json("could not execute"))
    })

          

          
}


