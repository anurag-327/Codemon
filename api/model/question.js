const mongoose = require("mongoose");

const newques = new mongoose.Schema(
  {
    question: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
      unique: false,
    },
    description: {
      type: String,
      require: true,
    },
    sampleCases: { type: Array, default: [] },
    points: {
      type: Number,
      default: 50,
    },
    difficultyLevel: {
      type: Number,
      default: 2,
    },
    defaultCode: {
      type: String,
    },
    userCode: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const questionSchema = new mongoose.model("question", newques);
module.exports = questionSchema;
