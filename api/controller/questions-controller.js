const notesSchema = require("../model/notes");
const questionSchema = require("../model/question");
const submissionSchema = require("../model/submission");
const testcaseSchema = require("../model/testcases");
module.exports.addQuestion = async (req, res) => {
  try {
    const {
      question,
      description,
      points,
      difficultyLevel,
      defaultCode,
      userCode,
      sampleCases,
    } = req.body;
    // safety check
    // processing
    if (
      question &&
      description &&
      points &&
      difficultyLevel &&
      defaultCode &&
      userCode &&
      sampleCases
    ) {
      const newQuestion = new questionSchema({
        ...req.body,
        addedBy: req.user._id,
      });
      const result = await newQuestion.save();
      if (result)
        return res.status(201).json({
          status: 201,
          question: {
            name: result.name,
            question: result.question,
            id: result._id,
            addedBy: result.addedBy,
          },
        });
      else
        return res
          .status(404)
          .json({ status: 404, message: "Failed to add question" });
    }
    return res.status(400).json({ status: 400, message: "Fields Missing" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports.getQuestions = async (req, res) => {
  try {
    const pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber)
      : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const skipValue = (pageNumber - 1) * pageSize;
    const question = await questionSchema
      .find()
      .skip(skipValue)
      .limit(pageSize)
      .select("question name difficultyLevel points ");
    const count = await questionSchema.count();
    if (question)
      return res.status(200).json({
        status: 200,
        totalQuestions: count,
        questions: question,
      });
    else
      return res
        .status(404)
        .json({ status: 404, message: "Question not found" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
};

module.exports.getQuestion = async (req, res) => {
  try {
    const question = await questionSchema
      .findOne({ question: req.params.name })
      .select(" -defaultCode");
    if (question) {
      const submissions = await submissionSchema
        .find({
          questionId: question._id,
          userId: req.user._id,
        })
        .sort({ createdAt: -1 });
      const note = await notesSchema.findOne({
        questionId: question._id,
        userId: req.user._id,
      });
      let userNote = note ? note.note : null;

      return res
        .status(200)
        .json({ status: 200, question, submissions, note: userNote });
    } else
      return res
        .status(404)
        .json({ status: 404, message: "Question not found" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};
module.exports.getQuestionById = async (req, res) => {
  try {
    const question = await questionSchema
      .findById(req.params.id)
      .select(" -defaultCode");
    if (question) {
      const testCases = await testcaseSchema
        .find({
          questionId: question._id,
        })
        .sort({ createdAt: -1 });

      return res.status(200).json({ status: 200, question, testCases });
    } else
      return res
        .status(404)
        .json({ status: 404, message: "Question not found" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};
