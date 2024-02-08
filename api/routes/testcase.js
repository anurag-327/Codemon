const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controller/verifyToken");
//api to add test case
router.post(
  "/add-testcase",
  verifyToken,
  require("../controller/testcase-controller").addTestcase
);

module.exports = router;
