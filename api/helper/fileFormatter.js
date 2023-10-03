const fs=require('fs')
const path=require("path");
module.exports.formatFile=(req,res,codeFile,inputFile,outputFile,expectedOutputFile,code,input,expectedOutput) =>
{
   try {
    fs.writeFileSync(path.join(__dirname,`../code/${codeFile}.cpp`),code);
    fs.writeFileSync(path.join(__dirname,`../code/${inputFile}.txt`),input);
    fs.writeFileSync(path.join(__dirname,`../code/${outputFile}.txt`),"");
    if(expectedOutput)
        fs.writeFileSync(path.join(__dirname,`../code/${expectedOutputFile}.txt`),expectedOutput);
   } catch (error) 
   {
    return res.status(500).json({status:500,message:"Error in formatting code file"})
   }
    
}