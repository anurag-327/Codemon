const mongoose = require("mongoose");
const newsubmission = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
    code: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    isAccepted: {
      type: Boolean,
      require: true,
      default: false,
    },
    language: {
      type: String,
      default: "C++",
    },
  },
  {
    timestamps: true,
  }
);

const submissionSchema = new mongoose.model("submission", newsubmission);
module.exports = submissionSchema;
