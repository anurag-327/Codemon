const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Question = require("../model/question");
const Code = require("../model/code");
const { verifyToken } = require("../controller/verifyToken");
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate({ path: "questionsSolved", populate: { path: "questionid" } })
      .select("-password");
    if (user) return res.status(200).json({ status: 200, user: user });
    else
      return res.status(404).json({ status: 404, message: "user not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
});
router.get("/question/:name", async (req, res) => {
  try {
    const question = await Question.findOne({ question: req.params.name });
    if (question)
      return res.status(200).json({ status: 200, question: question });
    else
      return res
        .status(404)
        .json({ status: 404, message: "Question not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
});
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find()
      .select("question _id difficultyLevel points")
      .sort("difficultyLevel");
    if (questions)
      return res
        .status(200)
        .json({ status: 200, count: questions.length, questions: questions });
    else
      return res
        .status(404)
        .json({ status: 404, message: "Questions not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
});

router.get("/codes/:name", verifyToken, async (req, res) => {
  try {
    const question = await Question.findOne({ question: req.params.name });
    if (question) {
      const codes = await Code.find({
        userid: req.user._id,
        questionid: question._id,
      }).populate({ path: "questionid" });
      if (codes)
        return res
          .status(200)
          .json({ status: 200, count: codes.length, codes });
      else
        return res
          .status(200)
          .json({ status: 200, count: codes.length, codes: [] });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Inavalid Question" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
});
router.get("/code/:id", async (req, res) => {
  try {
    const code = await Code.findById(req.params.id).populate({
      path: "questionid",
    });
    if (code) return res.status(200).json({ status: 200, code });
    else
      return res.status(404).json({ status: 404, message: "Codes not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
});

module.exports = router;
