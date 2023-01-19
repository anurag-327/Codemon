const newques=require("../model/question")
module.exports.addques=function(req,res)
{
    // console.log(req.body);
    return res.render("addques")
}
module.exports.saveques=function(req,res)
{
    console.log(req.body);
    const createques=async() =>
    {
        const newquestion= new newques(
            {
                question:req.body.question,
                description:req.body.description,
                input_output:
                {
                    sample1:
                    {
                        input1:req.body.input[0],
                        output1:req.body.output[0]
                    },
                    sample2:
                    {
                        input2:req.body.input[1],
                        output2:req.body.output[1]
                    }
                }
            }
        )
        const result= await newquestion.save();

    }
    createques();
    return res.json("Question Saved")
}