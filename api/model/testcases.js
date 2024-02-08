const mongoose = require("mongoose");

const newTestCase = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
    input: {
      type: String,
      require: true,
    },
    expectedOutput: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const testcaseSchema = new mongoose.model("testcase", newTestCase);
module.exports = testcaseSchema;
