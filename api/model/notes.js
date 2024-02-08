const mongoose = require("mongoose");

const newNotes = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
    note: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const notesSchema = new mongoose.model("note", newNotes);
module.exports = notesSchema;
