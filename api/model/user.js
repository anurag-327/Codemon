const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    socialMedia: {
      website: { type: String, default: "Not Specified" },
      github: { type: String, default: "Not Specified" },
      linkedin: { type: String, default: "Not Specified" },
      twitter: { type: String, default: "Not Specified" },
    },
    personalDetails: {
      gender: { type: String, default: "Not Specified" },
      location: { type: String, default: "Not Specified" },
      skills: { type: String, default: "Not Specified" },
      summary: { type: String, default: "Not Specified" },
    },
    points: {
      type: Number,
      default: 0,
    },
    questionsSolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("user", userSchema);
module.exports = User;
