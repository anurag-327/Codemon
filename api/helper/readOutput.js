const fs=require("fs");
const path=require("path")
module.exports.readOutput=(req,res,outputFile)=>
{
    const outputFilePath=path.join(__dirname,`../code/${outputFile}.txt`)
    fs.readFile(outputFilePath, 'utf8', function(err, data)
    {
        const files=["input.txt","input_code.cpp","output.txt","output.exe"]
        for(let file of files)
        {
            fs.unlink(`./code/${file}`, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
            });
        }
            return(res.status(200).json({status:200,"output":data}));
    });
}