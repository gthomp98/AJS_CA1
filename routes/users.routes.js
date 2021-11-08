const passport = require("passport");
const settings = require("../config/passport")(passport);
const jwt = require("jsonwebtoken");

const userController = require("../controllers/users.controllers");

const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.route("/user-profile").get(
  // passport.authenticate("jwt", { session: false }),
  userController.userProfile
);

module.exports = router;
