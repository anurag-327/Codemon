const exec = require('child_process').exec;
const { execFile } = require('child_process');
const path=require("path")
module.exports.generateAppFile=(req,res,inputFile,exeFile) =>
{
    try {
        return new Promise(function(resolve,reject)
        {
            const codeFilePath=path.join(__dirname,`../code/${inputFile}.cpp`)
            const exeFilePath=path.join(__dirname,`../code/${exeFile}.exe`)
            exec(`g++ ${codeFilePath} -o ${exeFilePath}`,(error,stdout,stderr)=>
            {
                try {
                    if(error || stderr)
                    {
                        console.log("reuest rejected",error,stderr)
                        return(res.status(400).json({status:400,error:stderr.split("error:")[1]}))
                        reject("request rejected");
                    }
                    else
                    {
                        // console.log("request resolved")
                        resolve("Accepted promise"); 
                    } 
                } catch (error) {
                    return(res.status(500).json({status:500,message:error.message}))   
                }
                
            });
        }) 
    } catch (error) 
    {
        return(res.status(500).json({status:500,message:error.message}))   
    }
    
}