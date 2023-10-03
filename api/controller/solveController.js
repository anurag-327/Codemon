const {formatFile}=require("../helper/fileFormatter")
const {runCode}=require("../helper/runCode");
const {generateAppFile}=require("../helper/appFileGenerator");
const {readOutput}=require("../helper/readOutput");
const {exec}=require("child_process");
const Question=require("../model/question");
const Code=require("../model/code");
const User=require("../model/user");
const path=require("path")
const fs=require("fs")
const { stdout } = require("process");

// testing for sample cases
module.exports.testCode=(req,res)=>
{
    try {
        const questionName=req.body.name;
        let code=req.body.code;
        const date=new Date();
        const fileName=req.user._id+"_"+date.getFullYear()+date.getMonth()+date.getDate()+date.getMinutes()+date.getSeconds();
        
        const inputFileName=fileName+"_"+"input";
        const outputFileName=fileName+"_"+"output";
        // altering codes
        const pattern=/ main\(.*\)(.*)(.*\n)?\{/g;
        const patternIndexObject=code.matchAll(pattern);
        const patternIndex=[...patternIndexObject][0].index;
        const curly=code.substring(patternIndex).indexOf('{')
        code=code.substring(0,patternIndex+curly+1)+`\n   freopen("./code/${inputFileName}.txt","r",stdin); \n `+code.substring(patternIndex+curly+1,code.length);       
        // code and question checks
        if(!req.body.name)
        {
            return res.status(400).json({status:400,message:"Question Id Missing"})
        }
        if(!code)
        {
           return res.status(400).json({status:400,message:"Code Missing"})
        }
        checkCode(req,res,fileName,code,"","",).then(async(msg) =>
        {
            // code is successfully compiled
            try { 
                const questionData=await Question.findOne({question:questionName});
                if(questionData) // question exist
                {
                    const sampleTestCasesData=questionData.sampleCases;
                    for(let test of sampleTestCasesData)
                    {
                        
                        const result=await checkOutput(req,res,fileName,code,test.input)
                        if(result.result==true)
                        {
                            // getting answer from stdout rather than output file
                            const output=result.output;
                            const expectedOutput=test.output;
                            if(output!==expectedOutput)
                                return res.status(400).json({status:400,result:false,message:"Wrong Answer",breakPoint:{input:test.input,output:result.output,expectedOutput:test.output}})
                        }
                        else
                        {
                            return res.status(400).json({status:400,result:false,message:"Could Not execute code"})
                        }
                    }
                    // all test cases passed
                    // delete all generated files
                    const files=[fileName+".cpp",inputFileName+".txt",outputFileName+".txt",fileName+".exe"]
                    for(let file of files)
                    {
                        fs.unlink(`./code/${file}`, function (err) {
                            if (err) throw err;
                        });
                    }
                    // all sample testcases running
                    return res.status(200).json({status:200,result:true,message:"Correct Answer"})
                }
                else
                {
                    // in valid question id
                    return res.status(404).json({status:400,message:"Question Not found"})
                }
            }catch (error) 
            {
                console.log(error)
            }
        })  
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({status:500,message:"Internal Server Error"})   
    }    
}

// running for sample cases
module.exports.submitCode=async (req,res)=>
{
    try {
        const questionName=req.body.name;
        let code=req.body.code;
        const date=new Date();
        const fileName=req.user._id+"_"+date.getFullYear()+date.getMonth()+date.getDate()+date.getMinutes()+date.getSeconds();
        const inputFileName=fileName+"_"+"input";
        const outputFileName=fileName+"_"+"output";
        // altering codes
        const pattern=/ main\(.*\)(.*)(\n)?\{/g;
        const patternIndexObject=code.matchAll(pattern);
        const patternIndex=[...patternIndexObject][0].index;
        const curly=code.substring(patternIndex).indexOf('{')
        code=code.substring(0,patternIndex+curly+1)+`\n   freopen("./code/${inputFileName}.txt","r",stdin); \n `+code.substring(patternIndex+curly+1,code.length);
        // code and question checks
        if(!req.body.name)
        {
            return res.status(400).json({status:400,message:"Question Id Missing"})
        }
        if(!code)
        {
           return res.status(400).json({status:400,message:"Code Missing"})
        }
        checkCode(req,res,fileName,code,"","",).then(async(msg) =>
        {
            // code is successfully compiled
            try { 
                const questionData=await Question.findOne({question:questionName});
                if(questionData) // question exist
                {
                    const testCasesData=questionData.testCases;
                    for(let test of testCasesData)
                    {
                        const result=await checkOutput(req,res,fileName,code,test.input)
                        if(result.result==true)
                        {
                            // getting answer from stdout rather than output file
                            const output=result.output;
                            const expectedOutput=test.output;
                            if(output!==expectedOutput)
                                return res.status(400).json({status:400,result:false,message:"Wrong Answer",breakPoint:{input:test.input,output:result.output,expectedOutput:test.output}})
                        }
                        else
                        {
                            return res.status(400).json({status:400,result:false,message:"Could Not execute code"})
                        }
                    }
                    // all test cases passed
                    // delete all generated files
                    const files=[fileName+".cpp",inputFileName+".txt",outputFileName+".txt",fileName+".exe"]
                    for(let file of files)
                    {
                        fs.unlink(`./code/${file}`, function (err) {
                            if (err) throw err;
                        });
                    }
                    
                    // update list of solved questions and save code in database
                    const userDetails=await User.findOne({_id:req.user._id});
                    const array=await userDetails.questionsSolved;
                    let flag=true;
                    for(let i of array)
                    { 
                        if(i)
                        {
                            if(i.questionid.equals(questionData._id))
                            {
                               flag=false;
                               break;
                            }
                        }
                    }
                    const savecode=async () =>
                        {
                            try{
                                 const newcode=new Code({
                                 code:req.body.code,
                                 questionid:questionData._id,
                                 userid:req.user._id,
                                 })
                                 const resultcode=await newcode.save();
                                }
                                catch(err)
                                {
                                    console.log(err.message);
                                }
                        }
                    if(flag==true)  // unattempted question
                    {
                        
                        savecode();
                        array.push({questionid:questionData._id});
                        const data2= await User.findByIdAndUpdate(req.user._id,{$inc:{'userpoints':questionData.points},questionsSolved:array});
                        return res.status(200).json({status:200,result:true,message:"Correct Answer",pointsobtained:questionData.points})
                    }
                    else
                    {
                        savecode();
                        return res.status(200).json({status:200,result:true,message:"Correct Answer",pointsobtained:0})
                    }
                }
                else
                {
                    // in valid question name
                    return res.status(404).json({status:400,message:"Question Not found"})
                }
            }catch (error) 
            {
                console.log(error)
            }
        })  
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({status:500,message:"Internal Server Error"})   
    }
}


function checkCode(req,res,fileName,code,input,expectedOutput)
{
    const inputFileName=fileName+"_"+"input";
    const outputFileName=fileName+"_"+"output";
    const expectedOutputFileName=fileName+"_"+"expectedOutput";
    const codeFilePath=path.join(__dirname,`../code/${fileName}.cpp`)
    const exeFilePath=path.join(__dirname,`../code/${fileName}.exe`)
    formatFile(req,res,fileName,inputFileName,outputFileName,expectedOutputFileName,code,input,expectedOutput);
    return new Promise(function(resolve,reject)
        {
            exec(`g++ ${codeFilePath} -o ${exeFilePath}`,(error,stdout,stderr)=>
            {
                try {
                    if(error || stderr)
                    {
                        return(res.status(400).json({status:400,error:stderr.split("error:")[1]}))
                        reject("request rejected");
                    }
                    else
                    {
                        resolve("Accepted promise"); 
                    } 
                } catch (error) {
                    return(res.status(500).json({status:500,message:error.message}))   
                }
                
            });
        }) 
}

function checkOutput(req,res,fileName,code,input)
{
    const inputFileName=fileName+"_"+"input";
    const expectedOutputFileName=fileName+"_"+"expectedOutput";
    const outputFileName=fileName+"_"+"output";
    formatFile(req,res,fileName,inputFileName,outputFileName,expectedOutputFileName,code,input);
    return new Promise(function(resolve,reject)
    {
        try {
            const exeFilePath=path.join(__dirname,`../code/${fileName}.exe`)
            exec(`${exeFilePath}`,(error,stdout,stderr)=>
            {
               if(error || stderr)
               {
                    console.log("fail")
                   reject({result:false,error:stderr});
               }
               else
               {
                console.log("success")
                 resolve({result:true,output:stdout})
               }
               
           });
        } catch (error) {
            console.log(error) 
        }
    })  
}

 // const result=checkOutput(req,res,fileName,code,i.input,i.output)
                            // result.then(generatedOutput =>
                            // {
                            //     console.log("check success")
                            //     if(generatedOutput!=i.output)
                            //     return res.status(400).json({ststus:400,result:false,message:"Wrong Answer",breakPoint:test})
                            // }).catch(err=>
                            //     {
                            //     console.log("check fail")
                            //     return res.status(500).json({status:500,result:false,message:"Could not execute code"})
                            // })


                            // const inputFileName=fileName+"_"+"input";
                            // const expectedOutputFileName=fileName+"_"+"expectedOutput";
                            // const outputFileName=fileName+"_"+"output";
                            // console.log(inputFileName,expectedOutputFileName,outputFileName)
                            // fs.writeFileSync(path.join(__dirname,`../code/${fileName}.cpp`),code);
                            // fs.writeFileSync(path.join(__dirname,`../code/${inputFileName}.txt`),input);
                            // fs.writeFileSync(path.join(__dirname,`../code/${expectedOutputFileName}.txt`),expectedOutput);
                            // // formatFile(req,res,fileName,inputFileName,expectedOutputFileName,code,input,expectedOutput);
                            // const exeFilePath=path.join(__dirname,`../code/${fileName}.exe`)
                            // console.log(exeFilePath)
                            // exec(`${exeFilePath}`,(error,stdout,stderr)=>
                            // {
                            //     if(error || stderr)
                            //     {
                            //         console.log("fail")
                            //         reject("cannot make app run");
                            //     }
                            //     else
                            //     {
                            //         console.log("success")
                            //         resolve(stdout)
                            //     }
                            // })