const testcaseSchema = require("../model/testcases");
const questionSchema = require("../model/question");
module.exports.addTestcase = async (req, res) => {
  try {
    if (req.body.questionId && req.body.input && req.body.expectedOutput) {
      const question = await questionSchema.findById(req.body.questionId);
      if (question) {
        const newTestcase = await new testcaseSchema(req.body);
        const result = await newTestcase.save();
        return res.status(201).json({ status: 201, testCase: result });
      } else
        return res
          .status(404)
          .json({ status: 404, message: "Question not found" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
};
