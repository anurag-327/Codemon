const exec = require('child_process').exec;
const path=require("path");
const { stdout } = require("process");
module.exports.runCode=(req,res,exeFile)=>
{
    try {
        return new Promise(function(resolve,reject)
        {
           const exeFilePath=path.join(__dirname,`../code/${exeFile}.exe`)
           exec(`${exeFilePath}`,(error,stdout,stderr)=>
           {
              if(error || stderr)
              {
                
                 return res.status(500).json({status:500,message:"Failed to execute code"})
                  reject("cannot make app run");
              }
              else
              {
                // console.log("run resolved")
                resolve(stdout)
              }
              
          });
    })
    } catch (error) {
        return(res.status(500).json({status:500,message:error.message}))    
    }
    

}