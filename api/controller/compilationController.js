const {formatFile}=require("../helper/fileFormatter")
const {runCode}=require("../helper/runCode");
const {generateAppFile}=require("../helper/appFileGenerator");
const {readOutput}=require("../helper/readOutput");
const path=require("path")
module.exports.compile=async(req,res) =>
{
   try {
    if(!req.body.code)
    {
        return res.status(400).json({status:400,message:"Missing code"})
    }
    else
    {
        // formatting code,input and output file
        let code=req.body.code;
        const pattern=/ main\(.*\)(.*)(.*\n)?\{/g;
        const patternIndexObject=code.matchAll(pattern);
        const patternIndex=[...patternIndexObject][0].index;
        const curly=code.substring(patternIndex).indexOf('{')
        code=code.substring(0,patternIndex+curly+1)+`\n   freopen("./code/input.txt","r",stdin); freopen("./code/output.txt","w",stdout);  `+code.substring(patternIndex+curly+1,code.length);       
        await formatFile(req,res,"input_code","input","output","expectedOutput",code,req.body.input,"");
        function run()
        {
            runCode(req,res,"output").then(async (output)=>
            {
                readOutput(req,res,"output");
                // return res.status(200).json({status:200,output:output}) // to avoid headers cross
            },(error)=>
            {
                // console.log("hii",error)
                return res.status(500).json({status:500,message:"Server Error"})
            })
        }
        generateAppFile(req,res,"input_code","output").then(run,(error)=>
        {
            // console.log("hello",error)
            
        })
    }
   } catch (error) 
   {
    console.log(error.message)
    return res.status(500).json({status:500,message:"Internal Server Error"})
   }
}