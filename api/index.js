const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

const PORT = process.env.PORT || 5000;
const mongoose = require("./config/mongoose");
// app.use(express.static(__dirname));

app.get("/", (req, res) => {
  return res.json("Server Running Successfully");
});

// auth api's
app.use("/api/auth", require("./routes/auth"));
// user api's
app.use("/api/user", require("./routes/user"));
//compiler api's
app.use("/api/v1/compiler", require("./routes/compiler"));
//solver api's
app.use("/api/v1/solve", require("./routes/solve"));
// data api's
app.use("/api/v1/data", require("./routes/data"));
// questions api
app.use("/api/questions", require("./routes/questions"));
// testcase api
app.use("/api/testcase", require("./routes/testcase"));
// submission api
app.use("/api/submissions", require("./routes/submissions"));
// notes api
app.use("/api/notes", require("./routes/notes"));
app.listen(PORT, (err) => {
  if (err) console.log("Error setting up express");
  console.log("Server running successfully at", PORT);
});
