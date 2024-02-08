const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controller/verifyToken");

// user profile
router.get("/get-user/:id", require("../controller/user-controller").getUser);
// mini data of user in case of refresh or login
router.get(
  "/get-minidata",
  verifyToken,
  require("../controller/user-controller").getMinidata
);

module.exports = router;
