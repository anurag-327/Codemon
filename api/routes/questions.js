const express = require("express");
const { verifyToken } = require("../controller/verifyToken");
const router = express.Router();
router.post(
  "/add-question",
  verifyToken,
  require("../controller/questions-controller").addQuestion
);

// get All questions-> all?pageSize=1&pageNumber=1
router.get("/all", require("../controller/questions-controller").getQuestions);
// specific question with users submission and notes
router.get(
  "/question/:name",
  verifyToken,
  require("../controller/questions-controller").getQuestion
);
router.get(
  "/questionById/:id",
  verifyToken,
  require("../controller/questions-controller").getQuestionById
);
router.get(
  "/question/:name",
  verifyToken,
  require("../controller/questions-controller").getQuestion
);
module.exports = router;
