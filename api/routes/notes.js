const express = require("express");
const { verifyToken } = require("../controller/verifyToken");
const notesSchema = require("../model/notes");

const router = express.Router();

//get user's submsissions
router.post("/add-note", verifyToken, async (req, res) => {
  if (!req.body || !req.body.questionId)
    return res
      .status(400)
      .json({ status: 400, message: "Missing question Id" });
  try {
    const note = await notesSchema.findOne({
      userId: req.user._id,
      questionId: req.body.questionId,
    });
    if (note) {
      // update
      const data = await notesSchema.findByIdAndUpdate(note._id, {
        note: req.body.note || null,
      });
    } else {
      // create
      const newNotes = await new notesSchema({
        userId: req.user._id,
        questionId: req.body.questionId,
        note: req.body.note,
      });
      const newNote = await newNotes.save();
      if (!newNote)
        return res
          .status(500)
          .json({ status: 500, message: "Error saving note" });
    }
    return res.status(201).json({ status: 201, message: "Saved changes" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Server Error" });
  }
});

module.exports = router;
