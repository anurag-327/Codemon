const express = require("express");
const { verifyToken } = require("../controller/verifyToken");
const submissionSchema = require("../model/submission");
const router = express.Router();

//get user's submsissions
router.get("/get-submissions", verifyToken, async (req, res) => {
  const submissions = await submissionSchema.find({ userId: req.user._id });
  return res.status(200).json({ status: 200, submissions });
});

module.exports = router;
