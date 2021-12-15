//this is the user routes file. This contains all of the different url extensions that allow the api to access the code within the user controller.
const passport = require("passport");
const settings = require("../middlewares/passport")(passport);
const jwt = require("jsonwebtoken");

const userController = require("../controllers/users.controllers");

const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.route("/user-profile").get(userController.userProfile);

module.exports = router;
